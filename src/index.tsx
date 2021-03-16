import ReactDOM from "react-dom";
import AppWrapper from "./AppWrapper";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import jwtDecode from "jwt-decode";
import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloLink, Observable } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import { getAccessToken, setAccessToken } from "./accessToken";
import URI from "./URI";

const cache = new InMemoryCache({});
const requestLink = new ApolloLink(
    (operation, forward) =>
        new Observable(observer => {
            let handle: any;
            Promise.resolve(operation)
                .then(operation => {
                    const accessToken = getAccessToken();
                    operation.setContext({
                        headers: {
                            authorization: accessToken
                                ? `bearer ${accessToken}`
                                : "",
                        },
                    });
                })
                .then(() => {
                    handle = forward(operation).subscribe({
                        next: observer.next.bind(observer),
                        error: observer.error.bind(observer),
                        complete: observer.complete.bind(observer),
                    });
                })
                .catch(observer.error.bind(observer));

            return () => {
                if (handle) handle.unsubscribe();
            };
        })
);

const client = new ApolloClient({
    link: ApolloLink.from([
        new TokenRefreshLink({
            accessTokenField: "accessToken",
            isTokenValidOrUndefined: () => {
                const token = getAccessToken();

                if (!token) {
                    return true;
                }

                try {
                    const { exp } = jwtDecode(token) as any;
                    if (Date.now() >= exp * 1000) {
                        return false;
                    } else {
                        return true;
                    }
                } catch {
                    return false;
                }
            },
            fetchAccessToken: () => {
                return fetch(`${URI}/refresh_token`, {
                    method: "POST",
                    credentials: "include",
                });
            },
            handleFetch: (accessToken: string) => {
                setAccessToken(accessToken);
            },
            handleError: (err: any) => {
                console.warn("Your refresh token is invalid, Try to relogin");
                console.error(err);
            },
        }) as any,
        onError(({ graphQLErrors, networkError }) => {
            console.log(graphQLErrors);
            console.log(networkError);
        }),
        requestLink,
        new HttpLink({
            uri: `${URI}/graphql`,
            credentials: "include",
        }),
    ]),
    cache,
});

ReactDOM.render(
    <ApolloProvider client={client as any}>
        <AppWrapper />
    </ApolloProvider>,
    document.getElementById("root")
);
