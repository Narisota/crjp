import {
    useGetApiUsersQuery,
    useDeleteApiUserMutation,
    useAddApiUserMutation,
} from "../generated/graphql";
import "../css/table.scss";
import { useEffect, useState } from "react";

const EditUsers = () => {
    const { data, loading, error } = useGetApiUsersQuery();
    const [deleteApiUser] = useDeleteApiUserMutation();
    const [addApiUser] = useAddApiUserMutation();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    if (loading) {
        return <>...loading</>;
    }

    if (!data || error) {
        return <>An error has occurred</>;
    }

    console.log("data :>> ", data);

    return (
        <>
            <div className="container">
                <div className="center-align table-wrapper">
                    <span className="table-header z-depth-2">
                        <h3 className="white-text noselect">Api Users</h3>
                    </span>

                    <span className="table-body z-depth-1">
                        <div className="container">
                            <table className="striped responsive">
                                <tbody>
                                    <tr>
                                        <th></th>
                                        <th>Username</th>
                                        <th></th>
                                        <th></th>
                                    </tr>

                                    {data.getApiUsers.map((_val, i) => {
                                        return (
                                            <tr key={i}>
                                                <td></td>
                                                <td>
                                                    {
                                                        data.getApiUsers[i]
                                                            .username
                                                    }
                                                </td>
                                                <td>
                                                    <i
                                                        className="material-icons red-text"
                                                        onClick={async () => {
                                                            // delete user
                                                            let tmp = await deleteApiUser(
                                                                {
                                                                    variables: {
                                                                        uuid:
                                                                            data
                                                                                .getApiUsers[
                                                                                i
                                                                            ]
                                                                                .uuid,
                                                                    },
                                                                }
                                                            );

                                                            if (
                                                                tmp.data
                                                                    ?.deleteApiUser
                                                            ) {
                                                                window.location.reload();
                                                            } else {
                                                                M.toast({
                                                                    html:
                                                                        "An Error has occured",
                                                                });
                                                            }
                                                        }}
                                                    >
                                                        delete
                                                    </i>
                                                </td>
                                                <td></td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        <div className="divider"></div>
                        <div className="row">
                            <div className="col s4">
                                <div className="input-field">
                                    <input
                                        id="username"
                                        type="text"
                                        className="validate"
                                        value={username}
                                        onChange={e =>
                                            setUsername(e.target.value)
                                        }
                                    />
                                    <label htmlFor="username">Username</label>
                                    <span
                                        id="coupon-helper"
                                        className="helper-text"
                                        data-error="Please enter a username"
                                    ></span>
                                </div>
                            </div>
                            <div className="col s4">
                                <div className="input-field">
                                    <input
                                        id="pass"
                                        type="text"
                                        className="validate"
                                        value={password}
                                        onChange={e =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                    <label htmlFor="pass">Password</label>
                                    <span
                                        id="coupon-helper"
                                        className="helper-text"
                                        data-error="Please enter a password"
                                    ></span>
                                </div>
                            </div>
                            <div className="col s3">
                                <button
                                    style={{ width: "100%" }}
                                    className="btn right footerBtn green"
                                    onClick={async () => {
                                        document
                                            .getElementById("pass")!
                                            .classList.remove("invalid");
                                        document
                                            .getElementById("username")!
                                            .classList.remove("invalid");
                                        if (!password || !username) {
                                            if (!password) {
                                                document
                                                    .getElementById("pass")!
                                                    .classList.add("invalid");
                                            }

                                            if (!username) {
                                                document
                                                    .getElementById("username")!
                                                    .classList.add("invalid");
                                            }
                                        } else {
                                            let tmp = await addApiUser({
                                                variables: {
                                                    username,
                                                    password,
                                                },
                                            });
                                            if (tmp.data?.addApiUser) {
                                                window.location.reload();
                                            } else {
                                                M.toast({
                                                    html:
                                                        "An Error has occurred",
                                                });
                                            }
                                        }
                                    }}
                                >
                                    Create a user
                                </button>
                            </div>
                        </div>
                    </span>
                </div>
            </div>
        </>
    );
};

export default EditUsers;
