import { useEffect, useState } from "react";
import { setAccessToken } from "./accessToken";
import App from "./components/App";
import URI from "./URI";

const AppWrapper = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        //get new accessToken & refreshToken with fetch to URI/refresh_token
        let tmp = localStorage.getItem("urd") as string;
        fetch(`${URI}/api_refresh_token`, {
            method: "POST",
            credentials: "include",
            headers: {
                refreshToken: tmp,
            },
        }).then(async res => {
            const { accessToken, refreshToken } = await res.json();
            setAccessToken(accessToken);
            localStorage.setItem("urd", refreshToken);
            setLoading(false);
        });
    });

    if (loading) {
        return <>loading..</>;
    }

    return <App />;
};

export default AppWrapper;
