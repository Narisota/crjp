import { useEffect, useState } from "react";
import {
    useAddAnnouncementMutation,
    useDeleteAnnouncementMutation,
    useGetAnnouncementsQuery,
} from "../generated/graphql";
import M from "materialize-css";
const Announcements = () => {
    const { data, loading, error } = useGetAnnouncementsQuery();
    const [ADD_ANNOUNCE] = useAddAnnouncementMutation();
    const [DELETE_ANNOUNCE] = useDeleteAnnouncementMutation();

    const [refresh, setRefresh] = useState(false);
    const [text, setText] = useState("");

    useEffect(() => {
        M.AutoInit();
    });

    if (loading) {
        return <>...loading</>;
    }

    if (!data || error) {
        console.log("error :>> ", error);
        M.toast({ html: `${error}` });
        return (
            <div className="centered">
                <h1 className="red-text">An Error has occurred</h1>
            </div>
        );
    }

    let announcements: any = data!.getAnnouncements;

    return (
        <div className="container">
            <h1 className="center-align">Announcements</h1>

            {announcements.length === 0 ? (
                <h4 className="center-align">NONE</h4>
            ) : (
                <>
                    {announcements.map((_val: any, i: any) => {
                        return (
                            <div
                                className="container"
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <h4 className="center-align">
                                    {announcements[i].text}
                                </h4>

                                <i
                                    className="material-icons red-text"
                                    onClick={async () => {
                                        try {
                                            await DELETE_ANNOUNCE({
                                                variables: {
                                                    id: announcements[i].id,
                                                },
                                            });
                                            window.location.reload();
                                        } catch {
                                            M.toast({
                                                html: "An error occured",
                                            });
                                            M.toast({
                                                html:
                                                    "Could not add Announcement",
                                            });
                                        }
                                    }}
                                >
                                    delete
                                </i>
                            </div>
                        );
                    })}
                </>
            )}
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                }}
            >
                <button
                    className="btn black"
                    onClick={() => {
                        setRefresh(true);
                    }}
                >
                    Add an Announcement
                </button>
            </div>
            {refresh ? (
                <>
                    <div className="input-field">
                        <input
                            id="text_1"
                            className="validate"
                            type="text"
                            value={text}
                            onChange={e => setText(e.target.value)}
                        />
                        <label htmlFor="text_1">Announcement Text</label>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            width: "100%",
                        }}
                    >
                        <button
                            className="btn green"
                            onClick={async () => {
                                if (!!text) {
                                    try {
                                        await ADD_ANNOUNCE({
                                            variables: {
                                                text,
                                            },
                                        });

                                        window.location.reload();
                                    } catch {
                                        M.toast({
                                            html: "An error occured",
                                        });
                                        M.toast({
                                            html: "Could not add Announcement",
                                        });
                                    }
                                }
                            }}
                        >
                            Confirm
                        </button>
                    </div>
                </>
            ) : (
                <></>
            )}
        </div>
    );
};

export default Announcements;
