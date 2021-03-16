import { useState } from "react";
import Dropzone from "react-dropzone";
import Axios from "axios";
import { useAddSectionMutation } from "../../generated/graphql";
import { Redirect } from "react-router";

const AddSection = () => {
    const [addSection] = useAddSectionMutation();
    const [name, setName] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [redirect, setRedirect] = useState(false);

    const handleSubmit = async () => {
        if (!name || !imgUrl) {
            if (!name) {
                M.toast({ html: "Please add a Section name" });
            }
            if (imgUrl) {
                M.toast({ html: "Please add a img" });
            }
        } else {
            let res = await addSection({
                variables: {
                    name,
                    thumbnail: imgUrl,
                },
            });

            if (!res.data || !res.data.addSection) {
                M.toast({ html: "An Error has occurred" });
            } else {
                setRedirect(true);
            }
        }
    };

    const addImage = async (file: any) => {
        const form = new FormData();

        form.append("api_key", "767632178961832"); //get api key from cloudinary

        form.append("file", file);
        form.append("tags", `codeinfuse, medium, gist`);
        form.append("upload_preset", "re5zmdqn");
        let t = (Date.now() / 1000) | 0;
        form.append("timestamp", `${t}`);

        // "https://api.cloudinary.com/v1_1/CLOUD_NAME/image/upload"
        let res = await Axios.post(
            "https://api.cloudinary.com/v1_1/desimqzzy/image/upload",
            form,
            {
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                },
            }
        );
        setImgUrl(res.data.secure_url);
    };

    if (redirect) {
        return (
            <Redirect to={{ pathname: "/sections", state: { reload: true } }} />
        );
    }

    return (
        <div className="container">
            <div className="row">
                <h5>Add A Section</h5>
            </div>

            <form>
                <div className="row">
                    <div className="input-field">
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                        <label htmlFor="name">Section Name (Required)</label>
                        <span
                            className="helper-text"
                            data-error="Please enter a section name"
                        ></span>
                    </div>
                    <div className="container">
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <button
                                id="submit-btn"
                                className="btn green"
                                onClick={() => {
                                    document
                                        .getElementById("submit-btn")!
                                        .classList.add("disabled");
                                    handleSubmit();
                                }}
                            >
                                Submit
                            </button>

                            <Dropzone onDrop={async ([file]) => addImage(file)}>
                                {({ getRootProps, getInputProps }) => (
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <button className="btn black">
                                            ONLY 1 IMAGE (Required)
                                        </button>
                                        <br />
                                        <span>Multiple images coming soon</span>
                                    </div>
                                )}
                            </Dropzone>
                        </div>
                    </div>
                </div>
            </form>

            {!imgUrl ? (
                <></>
            ) : (
                <>
                    <img src={imgUrl} alt="thumbnail" />
                </>
            )}
        </div>
    );
};

export default AddSection;
