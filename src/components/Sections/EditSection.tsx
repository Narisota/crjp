import { useState } from "react";
import Dropzone from "react-dropzone";
import { Redirect } from "react-router";
import {
    useDeleteSectionMutation,
    useGetSectionByIdQuery,
    useUpdateSectionMutation,
} from "../../generated/graphql";
import Axios from "axios";

const getSectionId = () => {
    if (process.env.NODE_ENV === "production") {
        return Number(window.location.href.split(":")[2]);
    } else {
        return Number(window.location.href.split(":")[3]);
    }
};

const EditSection = () => {
    let section_id = getSectionId();
    const [name, setName] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [updateSection] = useUpdateSectionMutation();
    const [deleteSection] = useDeleteSectionMutation();

    const { data, loading, error } = useGetSectionByIdQuery({
        variables: {
            section_id,
        },
    });

    if (loading) {
        return <>...loading</>;
    }

    if (error || !data) {
        return (
            <Redirect to={{ pathname: "/sections", state: { reload: true } }} />
        );
    }

    const replaceImage = async (file: any) => {
        const form = new FormData();

        if (
            !process.env.REACT_APP_CLOUDINARY_CLOUD_NAME ||
            !process.env.REACT_APP_CLOUDINARY_API_KEY
        ) {
            M.toast({ html: "env err" });
            return;
        }

        form.append("api_key", `${process.env.REACT_APP_CLOUDINARY_API_KEY}`); //get api key from cloudinary

        form.append("file", file);
        form.append("tags", `codeinfuse, medium, gist`);
        form.append("upload_preset", "re5zmdqn");
        let t = (Date.now() / 1000) | 0;
        form.append("timestamp", `${t}`);

        // "https://api.cloudinary.com/v1_1/CLOUD_NAME/image/upload"
        let res = await Axios.post(
            `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
            form,
            {
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                },
            }
        );

        setImgUrl(res.data.secure_url);
    };

    console.log("data :>> ", data);

    const handleSubmit = async () => {
        //update section
        let res = await updateSection({
            variables: {
                section_id,
                name,
                thumbnail: imgUrl,
            },
        });

        if (!res.data || !res.data.updateSection) {
            M.toast({ html: "an error has occured" });
        } else {
            window.location.reload();
        }
    };

    return (
        <div className="container">
            <div className="row">
                <h5>Edit Section</h5>
            </div>
            <form>
                <div className="row">
                    <div className="input-field">
                        <input
                            className="input-field"
                            id="name"
                            type="text"
                            value={name}
                            onChange={e => {
                                setName(e.target.value);
                            }}
                        />
                        <label id="name-label" htmlFor="name">
                            {data.getSectionById.name}
                        </label>
                    </div>
                </div>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <button
                        className="btn green"
                        id="submit-btn"
                        onClick={() => handleSubmit()}
                    >
                        Submit
                    </button>

                    <Dropzone onDrop={async ([file]) => replaceImage(file)}>
                        {({ getRootProps, getInputProps }) => (
                            <span {...getRootProps()}>
                                <input {...getInputProps()} />
                                <button className="btn black" id="img_btn">
                                    Replace Image
                                </button>
                            </span>
                        )}
                    </Dropzone>

                    <button
                        className="btn modal-trigger red"
                        id="delete-button"
                        data-target="modal1"
                        onClick={async () => {
                            let res = await deleteSection({
                                variables: {
                                    section_id,
                                },
                            });

                            if (!res.data || !res.data.deleteSection) {
                                M.toast({ html: "an error occured" });
                            } else {
                                window.location.reload();
                            }
                        }}
                    >
                        Delete
                    </button>
                </div>
            </form>

            {!imgUrl ? (
                <img src={data.getSectionById.thumbnail} alt="thumbnail" />
            ) : (
                <img src={imgUrl} alt="thumbnail" />
            )}
        </div>
    );
};

export default EditSection;
