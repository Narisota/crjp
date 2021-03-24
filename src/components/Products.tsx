import { useApiGetProductsQuery } from "../generated/graphql";
import "../css/products.scss";
import { useLocation } from "react-router-dom";

const Products = () => {
    const location: any = useLocation();
    if (!!location.state) {
        if (location.state.reload) {
            window.location.reload();
        }
    }

    const { data, loading, error } = useApiGetProductsQuery();

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

    console.log("data", data);

    return (
        <div className="container" style={{ marginTop: "50px" }}>
            <nav
                className="z-depth-0 black-text "
                style={{ backgroundColor: "transparent" }}
            >
                <div className="nav-wrapper">
                    <h5
                        className="left"
                        style={{
                            marginBottom: "48px",
                            marginLeft: "16px",
                            marginRight: "16px",
                            fontWeight: "bold",
                            fontSize: "26px",
                            color: "#14161a",
                        }}
                    >
                        Products
                    </h5>
                    <ul className="right">
                        <li>
                            <a href="#/add-products">
                                <i className="material-icons black-text">add</i>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>

            <div className="products-grid">
                {data?.apiGetProducts.map((_val, i) => {
                    let product: any = data.apiGetProducts[i];
                    return (
                        <div
                            className="card"
                            style={{ margin: "0px 16px 32px 16px" }}
                            key={i}
                        >
                            {/* image here */}
                            <div className="card-image">
                                {!product.images[0].img_url ? (
                                    <img src="https://materializecss.com/images/sample-1.jpg" />
                                ) : (
                                    <img
                                        src={product.images[0].img_url}
                                        style={{ maxHeight: "280px" }}
                                    />
                                )}
                                <a
                                    href={`#/edit-product:${product.product_id}`}
                                    className="btn-floating btn-large halfway-fab large blue-grey darken-4"
                                >
                                    <i className=" large material-icons">
                                        edit
                                    </i>
                                </a>
                            </div>

                            <div className="card-content">
                                <span className="card-title">
                                    {product.name}
                                </span>
                                <p className="product-price">
                                    ${Number(product.price / 100).toFixed(2)}
                                </p>
                                <p>{product.desc}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Products;
