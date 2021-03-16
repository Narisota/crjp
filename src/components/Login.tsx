import { useState } from "react";
import { useApiLoginMutation } from "../generated/graphql";
import M from "materialize-css";
import { setAccessToken } from "../accessToken";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [Login] = useApiLoginMutation();
    const handleSubmit = async () => {
        try {
            let res = await Login({
                variables: {
                    username,
                    password,
                },
            });
            console.log("res :>> ", res);
            if (res && res.data) {
                let tmp = res.data.apiLogin.accessToken as any;
                setAccessToken(tmp!);
                localStorage.setItem("urd", res.data.apiLogin.refreshToken!);
                window.location.reload();
            }
        } catch (err) {
            console.log("err :>> ", err);
            M.toast({ html: "Failed Login" });
            M.toast({ html: "server is likely down" });
        }
    };

    return (
        <div
            className="login-wrapper"
            style={{
                backgroundColor: "#000",
                minHeight: "100vh",
                minWidth: "100vw",
            }}
        >
            <div className="container">
                <div className="row">
                    <div className="col s12">
                        <div className="card">
                            <div className="card-content">
                                <div>
                                    <h5 className="center-align">Login</h5>
                                    <form>
                                        <div className="row">
                                            <div className="input-field">
                                                <input
                                                    id="username"
                                                    type="text"
                                                    value={username}
                                                    onChange={e =>
                                                        setUsername(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                <label htmlFor="username">
                                                    Username
                                                </label>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field">
                                                <input
                                                    id="password"
                                                    type="password"
                                                    value={password}
                                                    onChange={e =>
                                                        setPassword(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                <label htmlFor="password">
                                                    Password
                                                </label>
                                            </div>
                                        </div>
                                        <div
                                            className="row"
                                            style={{
                                                display: "flex",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <button
                                                className="btn"
                                                style={{
                                                    minWidth: "150px",
                                                    backgroundColor: "#4285f4",
                                                    color: "#fff",
                                                }}
                                                onClick={() => handleSubmit()}
                                            >
                                                Login
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
