import { useEffect, useState } from "react";
import {
    useGetSectionsQuery,
    useApiGetProductQuery,
    useGetProductsOptionsQuery,
    useGetProductsSectionsQuery,
    useUpdateOptionsMutation,
} from "../../generated/graphql";
import Dropzone from "react-dropzone";
import { Redirect } from "react-router-dom";
import Axios from "axios";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { GetProductId } from "./GetProductId";
import ProductsMutations from "./ProductsMutations";

const GetSections = () => {
    const { data, loading } = useGetSectionsQuery();

    let sloading = loading;
    let sdata = data;
    return { sdata, sloading };
};

const GetProductsSections = () => {
    var product_id = GetProductId();
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

const GetProductsOptions = () => {
    var product_id = GetProductId();
    const { data, loading } = useGetProductsOptionsQuery({
        variables: {
            product_id,
        },
    });

    let odata = data,
        oloading = loading;

    return {
        odata,
        oloading,
    };
};

const EditProduct = () => {
    var product_id = GetProductId();
    const {
        addProductToSection,
        removeProductFromSection,
        updateProduct,
        deleteProduct,
        addImgToProduct,
        deleteImg,
        ADD_OPT_TO_PRODUCT,
        toggleDisplay,
        deleteOptions,
        // UPDATE_OPTS,
    } = ProductsMutations();

    const [UPDATE_OPTS] = useUpdateOptionsMutation();

    const [refresh, setRefresh] = useState(false);
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [price, setPrice] = useState(""); //price in cents
    const [stock, setStock] = useState("");
    const [image_urls, setImage_urls] = useState([]);
    const [image_ids, setImage_ids] = useState([]);

    const [sections, setSections] = useState([{}] as any[]);
    const [removedSections, setRemovedSections] = useState([] as number[]);

    const [optionValues, setOptionValues] = useState([
        {
            id: "",
            name: "",
            init: true,
            price: "",
        },
    ] as any[]);

    const [options, updateOptions] = useState([] as any);
    const [removedOptions, setRemovedOptions] = useState([] as number[]);

    const { sdata, sloading } = GetSections();
    const { pdata, ploading } = GetProductsSections();
    const { odata, oloading } = GetProductsOptions();
    const { data, loading, error } = useApiGetProductQuery({
        variables: {
            product_id,
        },
    });

    function handleOnDragEnd(result: any) {
        if (!result.destination) return;

        const items = Array.from(options);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        updateOptions(items);

        //reorder values state
        let values = optionValues;

        const [reorderedValue] = values.splice(result.source.index, 1);
        values.splice(result.destination.index, 0, reorderedValue);

        setOptionValues(values);
    }

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

        if (
            !sloading &&
            !!sdata &&
            !ploading &&
            !!pdata &&
            !oloading &&
            !!odata
        ) {
            if (!!optionValues[0] && optionValues[0].init) {
                let values = [{}];
                let options = [{}];

                if (odata.getProductsOptions.length === 0) {
                } else {
                    for (let i = 0; i < odata.getProductsOptions.length; i++) {
                        let opt = odata.getProductsOptions[i];

                        values[i] = {
                            name: ``,
                            price: ``,
                            stock: ``,
                        };

                        options[i] = {
                            id: `${opt.option_id}`,
                            name: `${opt.name}`,
                            price: `${opt.price}`,
                            stock: `${opt.stock}`,
                            opt_index: opt.index,
                        };
                    }
                    updateOptions(options);
                    setOptionValues(values);
                }
            }

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

    if (loading || sloading || ploading || oloading) {
        return <>...loading</>;
    }

    console.log("odata :>> ", odata);
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
        debugger;
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

        if (removedOptions.length !== 0) {
            let options_str = JSON.stringify(removedOptions);
            await deleteOptions({ variables: { options_str } });
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
                        product_id: data?.apiGetProduct.product_id!,
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

        // add options
        if (options.length !== 0) {
            // get indexes though dom
            let ul = document.getElementById("options-DD")!;

            //create options array to pass into mutation
            let options = [{}] as any[];
            let updatedOptions = [{}] as any[];

            for (let i = 0; i < ul.children.length; i++) {
                let name: any = document.getElementById(`name-${i}`)!;
                let price: any = document.getElementById(`price-${i}`)!;
                let stock: any = document.getElementById(`stock-${i}`);

                if (name.labels[0].innerHTML.toLowerCase() === "option") {
                    if (!name.value || !stock.value) {
                        M.toast({ html: "please add missing values" });
                        return;
                    }
                    let tmp = price.value;
                    if (!tmp) {
                        tmp = data?.apiGetProduct.price;
                    }

                    options.unshift({
                        name: name.value,
                        price: Number(tmp),
                        stock: Number(stock.value),
                        index: i,
                    });
                } else {
                    let tmp = price.value;
                    if (!tmp) {
                        tmp = data?.apiGetProduct.price;
                    }

                    //get current index from ul

                    let option_id =
                        ul.children[i].attributes["data-rbd-draggable-id"]
                            .value;

                    updatedOptions.unshift({
                        name: name.value,
                        price: Number(tmp),
                        stock: Number(stock.value),
                        index: i,
                        option_id,
                    });
                }
            }

            for (let i = 0; i < options.length; i++) {
                if (!options[i].name) {
                    options.splice(i, 1);
                }
            }

            let options_str = JSON.stringify(options);

            let res = await ADD_OPT_TO_PRODUCT({
                variables: {
                    options_str,
                    product_id,
                },
            });

            options_str = JSON.stringify(updatedOptions);

            console.log("updatedOptions :>> ", updatedOptions);
            await UPDATE_OPTS({
                variables: {
                    options_str,
                },
            });

            if (!res.data?.addOptionToProduct) {
                M.toast({ html: "An Error has occured" });
                M.toast({ html: "Please try refreshing the page" });
                M.toast({ html: "If error persist check heroku logs" });
                return;
            }
        }

        window.location.reload();
    };

    let product = data!.apiGetProduct;

    return (
        <div className="container" style={{ width: "50%" }}>
            <div className="row">
                <h5>Edit Product</h5>
                <h5
                    className="right"
                    onClick={async () => {
                        await toggleDisplay({ variables: { product_id } });
                        window.location.reload();
                    }}
                >
                    {data?.apiGetProduct.hidden ? (
                        <>Status: Hidden</>
                    ) : (
                        <>Status: Shown</>
                    )}
                </h5>
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

                <div className="row">
                    <div className="container">
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <span>Option</span>
                            <span>Price</span>
                        </div>

                        <DragDropContext onDragEnd={handleOnDragEnd}>
                            <Droppable droppableId="characters">
                                {provided => (
                                    <ul
                                        className="characters"
                                        id="options-DD"
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                    >
                                        {options.map(
                                            (
                                                { id, name, price, stock },
                                                index: any
                                            ) => {
                                                // sortByProp(options, "index");

                                                return (
                                                    <Draggable
                                                        key={`${id}`}
                                                        draggableId={`${id}`}
                                                        index={index}
                                                    >
                                                        {prov => (
                                                            <li
                                                                ref={
                                                                    prov.innerRef
                                                                }
                                                                {...prov.draggableProps}
                                                                {...prov.dragHandleProps}
                                                            >
                                                                <div
                                                                    style={{
                                                                        width:
                                                                            "100%",
                                                                        display:
                                                                            "flex",
                                                                        justifyContent:
                                                                            "space-between",
                                                                        backgroundColor:
                                                                            "white",

                                                                        margin: 0,
                                                                        borderBottom:
                                                                            "1px solid #f2f3f7",
                                                                    }}
                                                                    className="row"
                                                                >
                                                                    <div className="col s5 noselect">
                                                                        <div className="input-field product-input">
                                                                            <input
                                                                                className="browser-default"
                                                                                id={`name-${index}`}
                                                                                type="text"
                                                                                value={
                                                                                    !optionValues[
                                                                                        index
                                                                                    ]
                                                                                        ? ""
                                                                                        : optionValues[
                                                                                              index
                                                                                          ]
                                                                                              .name
                                                                                }
                                                                                onChange={e => {
                                                                                    if (
                                                                                        e.target.value.match(
                                                                                            /^ /
                                                                                        )
                                                                                    ) {
                                                                                        let tmp = optionValues;
                                                                                        tmp[
                                                                                            index
                                                                                        ].name = e.target.value.substring(
                                                                                            1
                                                                                        );

                                                                                        setOptionValues(
                                                                                            tmp
                                                                                        );
                                                                                        setRefresh(
                                                                                            !refresh
                                                                                        );
                                                                                    } else {
                                                                                        let tmp = optionValues;
                                                                                        tmp[
                                                                                            index
                                                                                        ].name =
                                                                                            e.target.value;

                                                                                        setOptionValues(
                                                                                            tmp
                                                                                        );
                                                                                        setRefresh(
                                                                                            !refresh
                                                                                        );
                                                                                    }
                                                                                }}
                                                                            />
                                                                            <label
                                                                                htmlFor={`name-${index}`}
                                                                            >
                                                                                {
                                                                                    name
                                                                                }
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col s2 offset-s1 noselect">
                                                                        <div className="input-field product-input">
                                                                            <input
                                                                                className="browser-default"
                                                                                id={`price-${index}`}
                                                                                type="text"
                                                                                value={
                                                                                    !optionValues[
                                                                                        index
                                                                                    ]
                                                                                        ? ""
                                                                                        : optionValues[
                                                                                              index
                                                                                          ]
                                                                                              .price
                                                                                }
                                                                                onChange={e =>
                                                                                    updateOptionValue(
                                                                                        "price",
                                                                                        index,
                                                                                        e,
                                                                                        optionValues,
                                                                                        setOptionValues,
                                                                                        refresh,
                                                                                        setRefresh
                                                                                    )
                                                                                }
                                                                            />
                                                                            <label
                                                                                htmlFor={`price-${index}`}
                                                                            >
                                                                                $
                                                                                {Number(
                                                                                    price /
                                                                                        100
                                                                                ).toFixed(
                                                                                    2
                                                                                )}
                                                                            </label>
                                                                        </div>
                                                                    </div>

                                                                    <div className="col s3 noselect">
                                                                        <div className="input-field product-input">
                                                                            <input
                                                                                className="browser-default"
                                                                                id={`stock-${index}`}
                                                                                type="text"
                                                                                value={
                                                                                    !optionValues[
                                                                                        index
                                                                                    ]
                                                                                        ? ""
                                                                                        : optionValues[
                                                                                              index
                                                                                          ]
                                                                                              .stock
                                                                                }
                                                                                onChange={e =>
                                                                                    updateOptionValue(
                                                                                        "stock",
                                                                                        index,
                                                                                        e,
                                                                                        optionValues,
                                                                                        setOptionValues,
                                                                                        refresh,
                                                                                        setRefresh
                                                                                    )
                                                                                }
                                                                            />

                                                                            <label
                                                                                htmlFor={`stock-${index}`}
                                                                            >
                                                                                {stock ? (
                                                                                    <>
                                                                                        STOCK
                                                                                        =&gt;{" "}
                                                                                        {
                                                                                            stock
                                                                                        }
                                                                                    </>
                                                                                ) : (
                                                                                    <>
                                                                                        STOCK
                                                                                    </>
                                                                                )}
                                                                            </label>
                                                                        </div>
                                                                    </div>

                                                                    <i className="material-icons noselect">
                                                                        drag_handle
                                                                    </i>
                                                                    <i
                                                                        className="material-icons red-text noselect"
                                                                        onClick={() => {
                                                                            let length = odata!
                                                                                .getProductsOptions!
                                                                                .length;
                                                                            for (
                                                                                let i = 0;
                                                                                i <
                                                                                length;
                                                                                i++
                                                                            ) {
                                                                                if (
                                                                                    odata!
                                                                                        .getProductsOptions[
                                                                                        i
                                                                                    ]
                                                                                        .option_id ===
                                                                                    Number(
                                                                                        id
                                                                                    )
                                                                                ) {
                                                                                    let tmp = removedOptions;
                                                                                    tmp.push(
                                                                                        Number(
                                                                                            id
                                                                                        )
                                                                                    );
                                                                                    setRemovedOptions(
                                                                                        tmp
                                                                                    );

                                                                                    break;
                                                                                }
                                                                            }

                                                                            for (
                                                                                let i = 0;
                                                                                i <
                                                                                options.length;
                                                                                i++
                                                                            ) {
                                                                                if (
                                                                                    options[
                                                                                        i
                                                                                    ]
                                                                                        .id ===
                                                                                    id
                                                                                ) {
                                                                                    let tmp = options;
                                                                                    console.log(
                                                                                        "tmp b4 :>> ",
                                                                                        tmp
                                                                                    );
                                                                                    tmp.splice(
                                                                                        i,
                                                                                        1
                                                                                    );
                                                                                    console.log(
                                                                                        "tmp :>> ",
                                                                                        tmp
                                                                                    );

                                                                                    updateOptions(
                                                                                        tmp
                                                                                    );

                                                                                    tmp = optionValues;

                                                                                    tmp.splice(
                                                                                        i,
                                                                                        1
                                                                                    );
                                                                                    setOptionValues(
                                                                                        tmp
                                                                                    );

                                                                                    setRefresh(
                                                                                        !refresh
                                                                                    );
                                                                                }
                                                                            }
                                                                        }}
                                                                    >
                                                                        delete
                                                                    </i>
                                                                </div>
                                                            </li>
                                                        )}
                                                    </Draggable>
                                                );
                                            }
                                        )}
                                        {provided.placeholder}
                                    </ul>
                                )}
                            </Droppable>
                        </DragDropContext>

                        <button
                            className="add-option"
                            onClick={() => {
                                //updated state
                                let q = options;
                                let tmp = q;
                                tmp.push({
                                    id: `opt-${Number(
                                        Math.random() * (100 - 5) + 5
                                    ).toFixed(2)}`,
                                    name: "Option",
                                    price: data?.apiGetProduct.price,
                                });

                                updateOptions(tmp);

                                q = optionValues;
                                tmp = q;

                                //space to prevent if from firing after first time
                                tmp.push({
                                    name: "",
                                    price: "",
                                    stock: "",
                                });

                                //remove init value
                                if (tmp[0].init) {
                                    tmp.splice(0, 1);
                                }

                                setOptionValues(tmp);

                                setRefresh(!refresh);
                            }}
                        >
                            <i className="material-icons">add</i>
                        </button>
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
                        {data?.apiGetProduct.images!.map((_val, i) => {
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
                                                data.apiGetProduct.images![i]
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
                                                data?.apiGetProduct.images![i]
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

const updateOptionValue = (
    prop,
    index,
    e,
    optionValues,
    setOptionValues,
    refresh,
    setRefresh
) => {
    if (!e.target.value && e.target.value !== ".") {
        let tmp = optionValues;

        tmp[index][prop] = e.target.value;

        setOptionValues(tmp);
    }

    if (!e.target.value.match(/\D/g)) {
        let tmp = optionValues;

        tmp[index][prop] = e.target.value;

        setOptionValues(tmp);
        setRefresh(!refresh);
    }
};

export default EditProduct;
