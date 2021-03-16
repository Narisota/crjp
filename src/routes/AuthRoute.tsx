import { Route, RouteProps, Redirect } from "react-router-dom";
import { getAccessToken } from "../accessToken";
import jwtDecode from "jwt-decode";

export const checkAuth = (): boolean => {
    const token = getAccessToken();
    if (!token) {
        return false;
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
};

interface IAuthRouteProps extends RouteProps {
    component: any;
}

const AuthRoute: React.FC<IAuthRouteProps> = ({
    component: Component,
    ...rest
}) => (
    <Route
        {...rest}
        render={props =>
            checkAuth() ? (
                <Component {...props} />
            ) : (
                <Redirect to="/dashboard" />
            )
        }
    />
);
export default AuthRoute;
