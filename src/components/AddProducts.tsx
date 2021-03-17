import { useState } from "react";
import {
    useAddImgToProductMutation,
    useAddProductMutation,
} from "../generated/graphql";
import Dropzone from "react-dropzone";
import Axios from "axios";
import { Redirect } from "react-router";

const AddProducts = () => {
    const [addProduct] = useAddProductMutation();
    const [addImgToProduct] = useAddImgToProductMutation();
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [image_urls, setImage_urls] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [redirect, setRedirect] = useState(false);

    const handleSubmit = async () => {
        let resetBtn = () => {
            document.getElementById("submit-btn")?.classList.remove("disabled");
        };
        if (!name || !desc || !price || !stock) {
            inputValidation(name, desc, price, stock);
        } else {
            try {
                let product_id = await addProduct({
                    variables: {
                        name,
                        desc,
                        price: Number(price),
                        stock: Number(stock),
                    },
                });

                //ADD IMAGES TO PRODUCT
                for (let i = 0; i < image_urls.length; i++) {
                    await addImgToProduct({
                        variables: {
                            img_url: image_urls[i],
                            product_id: Number(product_id.data!.addProduct),
                        },
                    });
                }

                setRedirect(true);
            } catch {
                M.toast({ html: "Could not add product" });
            }
        }
        resetBtn();
    };

    const addImages = async (files: any) => {
        {
            for (let i = 0; i < files.length; i++) {
                const form = new FormData();

                if (!process.env.REACT_APP_CLOUDINARY_CLOUD_NAME) {
                    M.toast({ html: "env err" });
                    return;
                }

                if (!process.env.REACT_APP_CLOUDINARY_CLOUD_NAME) {
                    M.toast({ html: "env err" });
                    return;
                }

                form.append(
                    "api_key",
                    `${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}`
                ); //get api key from cloudinary

                form.append("file", files[i]);
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

                let tmp: any = image_urls;
                tmp.push(res.data.secure_url);
                setImage_urls(tmp);
            }
            setRefresh(!refresh);
        }
    };
    if (redirect) {
        return (
            <Redirect to={{ pathname: "/products", state: { reload: true } }} />
        );
    }

    return (
        <div className="container" style={{ width: "50%" }}>
            <div className="row">
                <h5>Add A Product</h5>
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
                        <label htmlFor="name">Name</label>
                        <span
                            className="helper-text"
                            data-error="Please enter a product name"
                        ></span>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field">
                        <textarea
                            id="desc"
                            value={desc}
                            className="materialize-textarea"
                            onChange={e => setDesc(e.target.value)}
                        />
                        <label htmlFor="desc">Description</label>
                        <span
                            className="helper-text"
                            data-error="Please enter a product description"
                        ></span>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field">
                        <input
                            id="price"
                            type="text"
                            value={price}
                            onChange={e => {
                                if (!e.target.value) {
                                    setPrice(e.target.value);
                                }
                                if (e.target.value.match(/\d/g)) {
                                    setPrice(e.target.value);
                                }
                            }}
                        />
                        <label htmlFor="price">Price</label>
                        <span
                            className="helper-text"
                            data-error="Please enter a product price"
                        ></span>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field">
                        <input
                            id="stock"
                            type="text"
                            value={stock}
                            onChange={e => {
                                if (!e.target.value) {
                                    setStock(e.target.value);
                                }
                                if (e.target.value.match(/\d/g)) {
                                    setStock(e.target.value);
                                }
                            }}
                        />
                        <label htmlFor="stock">Stock</label>
                        <span
                            className="helper-text"
                            data-error="Please enter a stock amount"
                        ></span>
                    </div>
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

                        <Dropzone onDrop={async files => addImages(files)}>
                            {({ getRootProps, getInputProps }) => (
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <button className="btn black">
                                        Add Images
                                    </button>
                                </div>
                            )}
                        </Dropzone>
                    </div>
                </div>
            </form>

            {image_urls.length === 0 ? (
                <></>
            ) : (
                <>
                    {image_urls.map((_val, i) => {
                        return <img src={image_urls[i] as any} />;
                    })}
                </>
            )}
        </div>
    );
};
export default AddProducts;

const inputValidation = (name: any, desc: any, price: any, stock: any) => {
    document.getElementById("name")!.classList.remove("invalid");
    document.getElementById("desc")!.classList.remove("invalid");
    document.getElementById("price")!.classList.remove("invalid");
    document.getElementById("stock")!.classList.remove("invalid");

    if (!name) {
        document.getElementById("name")!.classList.add("invalid");
    }
    if (!desc) {
        document.getElementById("desc")!.classList.add("invalid");
    }
    if (!price) {
        document.getElementById("price")!.classList.add("invalid");
    }
    if (!stock) {
        document.getElementById("stock")!.classList.add("invalid");
    }
};
