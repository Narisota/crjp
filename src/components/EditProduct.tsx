import { useEffect, useState } from "react";
import {
    useDeleteProductMutation,
    useGetProductQuery,
    useUpdateProductMutation,
} from "../generated/graphql";
import Dropzone from "react-dropzone";
import { Redirect } from "react-router-dom";
import Axios from "axios";

const EditProduct = () => {
    let product_id = getProductId();

    const { data, loading, error } = useGetProductQuery({
        variables: {
            product_id,
        },
    });

    const [updateProduct] = useUpdateProductMutation();
    const [deleteProduct] = useDeleteProductMutation();
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [price, setPrice] = useState(""); //price in cents
    const [stock, setStock] = useState("");
    const image_urls = [""];

    useEffect(() => {
        var elems = document.querySelectorAll(".modal");
        M.Modal.init(elems);
    });

    if (loading) {
        return <>...loading</>;
    }

    if (error) {
        return <Redirect to="#/products" />;
    }

    const handleSubmit = async () => {
        //only send values which were updated if state is empty product.prop is sent instead
        let tmp_name = name,
            tmp_desc = desc,
            tmp_price = Number(price),
            tmp_stock = Number(stock);

        if (!name) {
            tmp_name = product.name;
        }

        if (!desc) {
            tmp_desc = product.desc;
        }

        if (!price) {
            tmp_price = product.price;
        }

        if (!stock) {
            tmp_stock = product.stock;
        }

        await updateProduct({
            variables: {
                product_id,
                name: tmp_name,
                desc: tmp_desc,
                price: tmp_price,
                stock: tmp_stock,
            },
        });

        return <Redirect to="#/products" />;
    };

    let product = data!.getProduct;

    return (
        <div className="container" style={{ width: "50%" }}>
            <div className="row">
                <h5>Edit Product</h5>
            </div>
            <form>
                <div className="row">
                    <div className="input-field">
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={e => {
                                setName(e.target.value as any);
                            }}
                        />
                        <label id="name-label" htmlFor="name">
                            {product.name}
                        </label>
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
                        <label htmlFor="desc">{product.desc}</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field">
                        <input
                            id="price"
                            type="text"
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                        />
                        <label htmlFor="price">
                            ${Number(product.price / 100)}
                        </label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field">
                        <input
                            id="stock"
                            type="text"
                            value={stock}
                            onChange={e => setStock(e.target.value)}
                        />
                        <label htmlFor="stock">{product.stock}</label>
                    </div>
                </div>

                <button className="btn green" onClick={() => handleSubmit()}>
                    Submit
                </button>

                <a className="btn modal-trigger red right" href="#modal1">
                    Delete
                </a>

                <Dropzone
                    onDrop={async ([file]) => {
                        const form = new FormData();

                        form.append("api_key", "767632178961832"); //get api key from cloudinary

                        form.append("file", file);
                        form.append("tags", `codeinfuse, medium, gist`);
                        form.append("upload_preset", "re5zmdqn");
                        let t = (Date.now() / 1000) | 0;
                        form.append("timestamp", `${t}`);

                        // "https://api.cloudinary.com/v1_1/CLOUD_NAME/image/upload"
                        Axios.post(
                            "https://api.cloudinary.com/v1_1/desimqzzy/image/upload",
                            form,
                            {
                                headers: {
                                    "X-Requested-With": "XMLHttpRequest",
                                },
                            }
                        )
                            .then(res => {
                                //Save image url to add to DB on submit
                                image_urls.push(res.data.secure_url);
                            })
                            .catch(error => {
                                M.toast({
                                    html:
                                        "An Error occured, please try again later.",
                                });
                                console.log("error", error);
                            });
                    }}
                >
                    {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            Click me to add a photo
                        </div>
                    )}
                </Dropzone>
            </form>

            <div id="modal1" className="modal">
                <div className="modal-content">
                    <h4>Are you sure you want to delete this product?</h4>
                    <p>This will also delete all of the users orders.</p>
                </div>
                <div className="modal-footer">
                    <button
                        id="delete-button"
                        className="btn right red"
                        onClick={async () => {
                            document
                                .getElementById("delete-button")
                                ?.classList.add("disabled");
                            let tmp = await deleteProduct({
                                variables: { product_id },
                            });
                            if (tmp.data?.deleteProduct) {
                                window.location.reload();
                            } else {
                                M.toast({ html: "Could not delete product" });
                                document
                                    .getElementById("delete-button")
                                    ?.classList.remove("disabled");
                            }
                        }}
                    >
                        Delete Product
                    </button>
                </div>
            </div>
        </div>
    );
};

const getProductId = (): number => {
    if (process.env.NODE_ENV === "production") {
        return Number(window.location.href.split(":")[2]);
    } else {
        return Number(window.location.href.split(":")[3]);
    }
};

export default EditProduct;
