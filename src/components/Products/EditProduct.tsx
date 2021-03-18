import { useEffect, useState } from "react";
import {
    useAddImgToProductMutation,
    useAddProductToSectionMutation,
    useDeleteProductMutation,
    useGetProductQuery,
    useGetSectionsQuery,
    useRemoveImgFromProductMutation,
    useUpdateProductMutation,
    useGetProductsSectionsQuery,
    useRemoveProductFromSectionMutation,
} from "../../generated/graphql";
import Dropzone from "react-dropzone";
import { Redirect } from "react-router-dom";
import Axios from "axios";

const GetSections = () => {
    const { data, loading } = useGetSectionsQuery();

    let sloading = loading;
    let sdata = data;
    return { sdata, sloading };
};

const GetProductsSections = () => {
    var product_id = -1;

    if (process.env.NODE_ENV === "production") {
        product_id = Number(window.location.href.split(":")[2]);
    } else {
        product_id = Number(window.location.href.split(":")[3]);
    }
    const { data, loading } = useGetProductsSectionsQuery({
        variables: {
            product_id,
        },
    });

    let pdata = data,
        ploading = loading;

    return {
        pdata,
        ploading,
    };
};

const EditProduct = () => {
    var product_id = -1;

    if (process.env.NODE_ENV === "production") {
        product_id = Number(window.location.href.split(":")[2]);
    } else {
        product_id = Number(window.location.href.split(":")[3]);
    }

    const { sdata, sloading } = GetSections();
    const { pdata, ploading } = GetProductsSections();
    const { data, loading, error } = useGetProductQuery({
        variables: {
            product_id,
        },
    });

    const [addProductToSection] = useAddProductToSectionMutation();
    const [removeProductFromSection] = useRemoveProductFromSectionMutation();
    const [updateProduct] = useUpdateProductMutation();
    const [deleteProduct] = useDeleteProductMutation();
    const [addImgToProduct] = useAddImgToProductMutation();
    const [deleteImg] = useRemoveImgFromProductMutation();
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [price, setPrice] = useState(""); //price in cents
    const [stock, setStock] = useState("");
    const [image_urls, setImage_urls] = useState([]);
    const [image_ids, setImage_ids] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [sections, setSections] = useState([{}] as any[]);
    const [removedSections, setRemovedSections] = useState([] as number[]);

    const onChipDeleteCB = (_e: any, i: any) => {
        console.log("deleted");
        let section_name = i.innerHTML.slice(0, i.innerHTML.indexOf("<"));

        let index = -1;
        for (let j = 0; j < sections.length; j++) {
            if (sections[j].name === section_name) {
                index = j;
                break;
            }
        }

        if (index !== -1) {
            let tmp = sections;
            tmp.splice(index, 1);
            setSections(tmp);
        } else {
            // cylcle through pdata, get one where name is = to section name save to removed state
            for (let j = 0; j < pdata!.getProductsSections.length; j++) {
                if (pdata!.getProductsSections[j].name === section_name) {
                    console.log("removing");
                    let tmp = removedSections;
                    tmp.push(pdata!.getProductsSections[j].section_id!);
                    setRemovedSections(tmp);
                }
            }
        }
    };

    const onChipAddCB = (_e: any, i: any) => {
        let section_name = i.innerHTML.slice(0, i.innerHTML.indexOf("<"));

        let tmp = sections;
        let section_id = -1;
        for (let j = 0; j < sdata!.getSections.length; j++) {
            if (sdata!.getSections[j].name === section_name) {
                section_id = sdata!.getSections[j].section_id;
                break;
            }
        }
        if (section_id !== -1) {
            tmp.push({ name: section_name, section_id });
            setSections(tmp);
        } else {
            i.innerHTML = `CHIP DOES NOT EXIST<i class="material-icons close">close</i>`;
        }
    };

    useEffect(() => {
        M.Modal.init(document.querySelectorAll(".modal"));

        let autoCompleteData: any = {},
            initialChips = [] as any[];

        if (!sloading && !!sdata && !ploading && !!pdata) {
            sdata.getSections.forEach((_val, i) => {
                autoCompleteData[`${sdata?.getSections[i].name}`] = null;
            });

            let options;

            if (
                !pdata.getProductsSections ||
                pdata.getProductsSections.length !== 0
            ) {
                pdata.getProductsSections.forEach((_val, i) => {
                    initialChips[i] = {
                        tag: pdata.getProductsSections[i].name,
                    };
                });
            }

            if (initialChips.length !== 0) {
                options = {
                    autocompleteOptions: {
                        data: autoCompleteData,
                    },
                    data: initialChips,
                    onChipAdd: onChipAddCB,
                    onChipDelete: onChipDeleteCB,
                };
            } else {
                options = {
                    autocompleteOptions: {
                        data: autoCompleteData,
                    },
                    onChipAdd: onChipAddCB,
                    onChipDelete: onChipDeleteCB,
                };
            }

            M.Chips.init(document.querySelectorAll(".chips"), options);
        }
    });

    if (loading || sloading || ploading) {
        return <>...loading</>;
    }

    if (error) {
        return <Redirect to="/products" />;
    }

    const addImages = async (files: any) => {
        {
            M.toast({ html: "Adding images please wait..." });
            toggleDisabledClass(["img_btn", "submit-btn", "delete-button"]);

            for (let i = 0; i < files.length; i++) {
                const form = new FormData();

                if (
                    !process.env.REACT_APP_CLOUDINARY_CLOUD_NAME ||
                    !process.env.REACT_APP_CLOUDINARY_API_KEY
                ) {
                    M.toast({ html: "env err" });
                    return;
                }

                form.append(
                    "api_key",
                    `${process.env.REACT_APP_CLOUDINARY_API_KEY}`
                ); //get api key from cloudinary

                form.append("file", files[i]);
                form.append("tags", `codeinfuse, medium, gist`);
                form.append("upload_preset", "re5zmdqn");
                let t = (Date.now() / 1000) | 0;
                form.append("timestamp", `${t}`);

                // "https://api.cloudinary.com/v1_1/CLOUD_NAME/image/upload"
                try {
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
                } catch (error) {
                    M.toast({ html: `Error: ${error}` });
                }
            }

            toggleDisabledClass(["img_btn", "submit-btn", "delete-button"]);
            setRefresh(!refresh);
        }
    };

    const handleSubmit = async () => {
        // add sections to products
        if (sections.length !== 1) {
            for (let j = 1; j < sections.length; j++) {
                let res = await addProductToSection({
                    variables: {
                        product_id,
                        section_id: sections[j].section_id,
                    },
                });

                if (!res.data || !res.data.addProductToSection) {
                    M.toast({
                        html: `An Error occurred while adding product to section => ${sections[j].name}`,
                    });

                    M.toast({
                        html: `If you got this error you added a section that does not exist`,
                    });

                    M.toast({
                        html: `Please use the autoselect functionality`,
                    });
                }
            }
        }

        // remove product from sections
        if (removedSections.length !== 0) {
            for (let j = 0; j < removedSections.length; j++) {
                let res = await removeProductFromSection({
                    variables: {
                        product_id,
                        section_id: removedSections[j],
                    },
                });

                if (!res.data || !res.data.removeProductFromSection) {
                    M.toast({ html: "Could not remove product from Section" });
                }
            }
        }

        await updateProduct({
            variables: {
                product_id,
                name: name || product.name,
                desc: desc || product.desc,
                price: Number(price) || product.price,
                stock: Number(stock) || product.stock,
            },
        });

        for (let i = 0; i < image_urls.length; i++) {
            try {
                await addImgToProduct({
                    variables: {
                        img_url: image_urls[i],
                        product_id: data?.getProduct.product_id!,
                    },
                });
            } catch (err) {
                M.toast({
                    html: `Error occured while trying to add an image: ${err}`,
                });
                return;
            }
        }

        for (let i = 0; i < image_ids.length; i++) {
            try {
                await deleteImg({
                    variables: {
                        img_id: image_ids[i],
                    },
                });
            } catch (e) {
                M.toast({
                    html: `Error occured while trying to remove an image: ${e}`,
                });
                return;
            }
        }

        window.location.reload();
    };

    let product = data!.getProduct;

    return (
        <div className="container" style={{ width: "50%" }}>
            <div className="row">
                <h5>Edit Product</h5>
            </div>
            <form>
                <div className="row">
                    <div className="input-field product-input">
                        <input
                            className="browser-default"
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
                    <div className="input-field product-input">
                        <textarea
                            className="browser-default materialize-textarea"
                            id="desc"
                            value={desc}
                            onChange={e => setDesc(e.target.value)}
                        />
                        <label htmlFor="desc">{product.desc}</label>
                    </div>
                </div>

                <div className="row">
                    <div className="input-field product-input">
                        <input
                            className="browser-default"
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
                        <label htmlFor="price">
                            ${Number(product.price / 100).toFixed(2)}
                        </label>
                    </div>
                </div>

                <div className="row">
                    <div className="input-field product-input">
                        <input
                            className="browser-default"
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
                        <label htmlFor="stock">
                            STOCK =&gt; {product.stock}
                        </label>
                    </div>
                </div>

                <div className="row">
                    <div className="chips chips-initial" id="chips-initial">
                        <span>Sections: </span>
                        <input className="custom-class" />
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

                    <Dropzone onDrop={async files => addImages(files)}>
                        {({ getRootProps, getInputProps }) => (
                            <span {...getRootProps()}>
                                <input {...getInputProps()} />
                                <button className="btn black" id="img_btn">
                                    Add Images
                                </button>
                            </span>
                        )}
                    </Dropzone>

                    <button
                        className="btn modal-trigger red"
                        id="delete-button"
                        data-target="modal1"
                    >
                        Delete
                    </button>
                </div>

                <div className="products-grid" style={{ marginTop: "32px" }}>
                    <>
                        {data?.getProduct.images!.map((_val, i) => {
                            return (
                                <div
                                    className="card"
                                    style={{ margin: "0px 16px 32px 16px" }}
                                    id={`card-${i}`}
                                    key={i}
                                >
                                    <span
                                        className="close-icon noselect"
                                        onClick={async () => {
                                            let tmp: any = image_ids;
                                            tmp.push(
                                                data.getProduct.images![i]
                                                    .img_id
                                            );
                                            setImage_ids(tmp);
                                            document.getElementById(
                                                `card-${i}`
                                            )!.style.display = "none";
                                        }}
                                    >
                                        <i className="material-icons white-text">
                                            close
                                        </i>
                                    </span>
                                    <div className="card-image noselect">
                                        <img
                                            src={
                                                data?.getProduct.images![i]
                                                    .img_url ||
                                                "https://materializecss.com/images/sample-1.jpg"
                                            }
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </>
                    {image_urls.length === 0 ? (
                        <></>
                    ) : (
                        <>
                            {image_urls.map((_val, i) => {
                                return (
                                    <div
                                        className="card"
                                        style={{ margin: "0px 16px 32px 16px" }}
                                    >
                                        <div className="card-image noselect">
                                            <img src={image_urls[i] as any} />
                                        </div>
                                    </div>
                                );
                            })}
                        </>
                    )}
                </div>
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
                            toggleDisabledClass(["delete-button"]);

                            let tmp = await deleteProduct({
                                variables: { product_id },
                            });

                            if (tmp.data?.deleteProduct) {
                                window.location.reload();
                            } else {
                                M.toast({ html: "Could not delete product" });
                                toggleDisabledClass(["delete-button"]);
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

const toggleDisabledClass = (idList: string[]) => {
    for (let i = 0; i < idList.length; i++) {
        try {
            document.getElementById(idList[i])!.classList.toggle("disabled");
        } catch {}
    }
};

export default EditProduct;
