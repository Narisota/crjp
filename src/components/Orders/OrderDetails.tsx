import {
    useGetOrderByIdQuery,
    useRemoveWarningMutation,
} from "../../generated/graphql";
import { useEffect, useState, useMemo } from "react";

const calcProdSubtotal = (products: any[]) => {
    let Subtotal: any = 0,
        sTotal: any = 100;

    for (let i = 0; i < products.length; i++) {
        Subtotal += products[i].productSubtotal!;
        console.log(
            "products[i].quantityOrdered :>> ",
            products[i].quantityOrdered
        );
        sTotal += products[i].quantityOrdered * 50;
    }

    let productsSubtotal = Number(Subtotal / 100).toFixed(2);

    if (sTotal > 500) {
        sTotal = 500;
    }

    let shippingTotal = Number(sTotal / 100).toFixed(2);

    return { productsSubtotal, shippingTotal };
};

const getOrderId = () => {
    console.log("gettings order id");
    if (process.env.NODE_ENV === "production") {
        return window.location.href.split(":")[2];
    } else {
        return window.location.href.split(":")[3];
    }
};

const OrderDetails = () => {
    const id = useMemo(() => getOrderId(), [getOrderId]);

    const { data, loading, error } = useGetOrderByIdQuery({
        variables: {
            order_id: Number(id),
        },
    });

    const [removeWarning] = useRemoveWarningMutation();

    const [state, setState] = useState(false);

    useEffect(() => {
        var elems = document.querySelectorAll(".modal");
        M.Modal.init(elems);
    });

    if (loading) {
        return <>...loading</>;
    }

    if (!data) {
        return (
            <div className="centered">
                <h3>No data was found</h3>
            </div>
        );
    }

    if (error) {
        return (
            <div className="centered">
                <h3>An Error has occured.</h3>
                <h3>{error.message}</h3>
            </div>
        );
    }

    console.log("data :>> ", data);

    const { productsSubtotal, shippingTotal } = calcProdSubtotal(
        data.getOrderById.products!
    );

    let amountOff = Number(
        (data.getOrderById.order_total! *
            Number("0." + data.getOrderById.discount)) /
            100
    ).toFixed(2);

    let str, dateOfPurchase;
    if (data.getOrderById.date_of_purchase) {
        str = data.getOrderById.date_of_purchase.split(" ");
        dateOfPurchase = `${str[0]} ${str[1]} ${str[2]} ${str[3]}`;
    }

    let shipping = JSON.parse(data.getOrderById.shipping!);

    return (
        <div className="container">
            {!data.getOrderById.warning ? (
                <></>
            ) : (
                <>
                    <div id="modal1" className="modal">
                        <div className="modal-content">
                            <h4>
                                Are you sure you want to remove this warning?
                            </h4>
                        </div>
                        <div className="modal-footer">
                            <a
                                href="#!"
                                className="modal-close btn red"
                                onClick={async () => {
                                    let tmp = await removeWarning({
                                        variables: {
                                            order_id: Number(id),
                                        },
                                    });
                                    if (tmp.data?.removeWarning) {
                                        window.location.reload();
                                    } else {
                                        M.toast({
                                            html: "An Error has occurred",
                                        });
                                        M.toast({
                                            html:
                                                "Please try again later or contact me on discord",
                                        });
                                    }
                                }}
                            >
                                Remove
                            </a>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12 ">
                            <div className="card">
                                <div className="card-content">
                                    <span
                                        className="card-title "
                                        style={{ fontWeight: "bold" }}
                                    >
                                        <span className="red-text">
                                            {data.getOrderById.warning}
                                        </span>
                                        <span className="right">
                                            <a
                                                className="btn modal-trigger black"
                                                href="#modal1"
                                            >
                                                Remove Warning
                                            </a>
                                        </span>
                                    </span>

                                    <p className="flow-text bold">
                                        What to do:
                                    </p>

                                    <p
                                        className="flow-text"
                                        style={{ marginLeft: "32px" }}
                                    >
                                        Double check the order. Ensure the
                                        customer paid the correct amount
                                    </p>

                                    <p
                                        className="flow-text"
                                        style={{ marginLeft: "32px" }}
                                    >
                                        This error will be thrown anytime there
                                        is the slightest difference in
                                        calculations.
                                    </p>

                                    <p
                                        className="flow-text"
                                        style={{ marginLeft: "32px" }}
                                    >
                                        If the difference is greater than a
                                        couple of pennies please contact me
                                        through discord.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {state ? (
                <>
                    <div className="row">
                        <div className="col offset-s6 s6">
                            <div className="card">
                                <div className="card-content">
                                    <div className="row">
                                        <div className="col s10 offset-s1">
                                            <span className="card-title">
                                                Order Summary
                                            </span>

                                            <div
                                                className="divider"
                                                style={{
                                                    marginTop: "4px",
                                                    marginBottom: "4px",
                                                }}
                                            ></div>

                                            <div>
                                                <span className="left">
                                                    Products Total
                                                </span>
                                                <span className="right">
                                                    ${productsSubtotal}
                                                </span>
                                            </div>

                                            <br />

                                            <div>
                                                <span className="left">
                                                    Tax
                                                </span>
                                                <span className="right">
                                                    $
                                                    {Number(
                                                        Number(
                                                            productsSubtotal
                                                        ) * 0.095
                                                    ).toFixed(2)}
                                                </span>
                                            </div>

                                            <br />

                                            <div>
                                                <span className="left">
                                                    Shipping
                                                </span>
                                                <span className="right">
                                                    ${shippingTotal}
                                                </span>
                                            </div>

                                            <br />

                                            <>
                                                {!data.getOrderById.coupon ? (
                                                    <></>
                                                ) : (
                                                    <>
                                                        <div
                                                            className="divider"
                                                            style={{
                                                                marginTop:
                                                                    "4px",
                                                                marginBottom:
                                                                    "4px",
                                                            }}
                                                        ></div>
                                                        <span className="left">
                                                            Coupon(
                                                            {
                                                                data
                                                                    .getOrderById
                                                                    .coupon
                                                            }
                                                            )
                                                        </span>
                                                        <span className="right">
                                                            {
                                                                data
                                                                    .getOrderById
                                                                    .discount
                                                            }
                                                            % (
                                                            <span className="red-text bold">
                                                                -${amountOff}
                                                            </span>
                                                            )
                                                        </span>
                                                    </>
                                                )}
                                            </>

                                            <br />
                                            <div
                                                className="divider"
                                                style={{
                                                    marginTop: "4px",
                                                    marginBottom: "4px",
                                                }}
                                            ></div>
                                            <span className="left bold">
                                                Order Total
                                            </span>
                                            <span className="right bold">
                                                $
                                                {Number(
                                                    data.getOrderById
                                                        .order_total! / 100
                                                ).toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <></>
            )}

            <div style={{ marginTop: "16px" }}>
                <div className="row z-depth-1">
                    <div
                        className="col s12"
                        style={{
                            padding: "0px",
                            backgroundColor: "white",
                        }}
                    >
                        <div
                            className="card-header row"
                            style={{
                                borderLeft: "5px solid #ff0000",
                                paddingTop: "13px",
                                paddingBottom: "13px",
                                paddingRight: "25px",
                                paddingLeft: "20px",
                                margin: "0px",
                                zIndex: 4,
                                position: "relative",
                            }}
                        >
                            <span
                                className="hide-on-small-only"
                                style={{
                                    display: "inline-block",
                                    width: "41.7%",
                                }}
                            >
                                <span
                                    style={{
                                        color: "#1d252c",
                                        paddingRight: "1rem",
                                        fontWeight: 700,
                                    }}
                                >
                                    Order ID
                                </span>
                                <span>CR-{data.getOrderById.order_id}</span>
                            </span>

                            <span
                                className="hide-on-med-and-up"
                                style={{
                                    display: "inline-block",
                                    width: "50%",
                                }}
                            >
                                <span
                                    style={{
                                        color: "#1d252c",
                                        paddingRight: "1rem",
                                        fontWeight: 700,
                                    }}
                                >
                                    Order ID
                                </span>
                                <span>CR-{data.getOrderById.order_id}</span>
                            </span>

                            <span
                                style={{
                                    display: "inline-block",
                                    width: "17%",
                                }}
                                className="hide-on-med-and-down"
                            >
                                {data.getOrderById.date_of_purchase ? (
                                    <span>{dateOfPurchase}</span>
                                ) : (
                                    <></>
                                )}
                            </span>

                            <span
                                style={{
                                    display: "inline-block",
                                    width: "30.3%",
                                    fontWeight: 700,
                                }}
                            >
                                <span
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <span>
                                        $
                                        {Number(
                                            data.getOrderById.order_total! / 100
                                        ).toFixed(2)}{" "}
                                        {data.getOrderById.discount ? (
                                            <span>
                                                (
                                                <span
                                                    style={{
                                                        color: "rgb(255, 0, 0)",
                                                    }}
                                                >
                                                    -$
                                                    {amountOff}
                                                </span>
                                                )
                                            </span>
                                        ) : (
                                            <></>
                                        )}
                                    </span>
                                    <span>
                                        <span
                                            style={{ color: "#0457c8" }}
                                            className="right"
                                            onClick={() => setState(!state)}
                                        >
                                            Payment Details
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </div>

                        <div className="divider"></div>

                        <div
                            className="card-body"
                            style={{
                                backgroundColor: "white",
                                zIndex: 2,
                                position: "relative",
                            }}
                        >
                            {data.getOrderById.products!.map(
                                (_val: any, j: any) => {
                                    return (
                                        <>
                                            <div className="row" key={j}>
                                                <div className="col m4">
                                                    <img
                                                        style={{
                                                            width: "100%",
                                                        }}
                                                        src={
                                                            data.getOrderById
                                                                .products![j]
                                                                .images![0]
                                                                .img_url
                                                        }
                                                    />
                                                </div>
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        justifyContent:
                                                            "space-between",
                                                        height: "100%",
                                                        paddingLeft: 0,
                                                    }}
                                                    className="col m2 offset-m1 hide-on-small-only"
                                                >
                                                    <p
                                                        className="flow-text"
                                                        style={{
                                                            fontSize: "16px",
                                                            fontWeight: "bold",
                                                        }}
                                                    >
                                                        {
                                                            data.getOrderById
                                                                .products![j]
                                                                .name!
                                                        }
                                                    </p>
                                                    <p className="hide-on-small-only">
                                                        Qty:{" "}
                                                        {
                                                            data.getOrderById
                                                                .products![j]
                                                                .quantityOrdered
                                                        }{" "}
                                                        ($
                                                        {Number(
                                                            data.getOrderById
                                                                .products![j]
                                                                .productSubtotal! /
                                                                100
                                                        ).toFixed(2)}{" "}
                                                        {data.getOrderById
                                                            .products![j]
                                                            .quantityOrdered ===
                                                        1 ? (
                                                            <></>
                                                        ) : (
                                                            <>
                                                                @ $
                                                                {Number(
                                                                    data
                                                                        .getOrderById
                                                                        .products![
                                                                        j
                                                                    ].price /
                                                                        100
                                                                ).toFixed(
                                                                    2
                                                                )}{" "}
                                                                each
                                                            </>
                                                        )}
                                                        )
                                                    </p>
                                                </div>

                                                <div className="col offset-m1 m3">
                                                    <>
                                                        {j === 0 ? (
                                                            <>
                                                                {!shipping ? (
                                                                    <p className="bold">
                                                                        No
                                                                        shipping
                                                                        information
                                                                        was
                                                                        found,
                                                                        check
                                                                        paypal,
                                                                        or
                                                                        contact
                                                                        the
                                                                        user.
                                                                    </p>
                                                                ) : (
                                                                    <div
                                                                        style={{
                                                                            width:
                                                                                "100%",
                                                                            borderLeft:
                                                                                " 4px solid #ff0000",
                                                                            paddingLeft:
                                                                                "15px",
                                                                        }}
                                                                    >
                                                                        <p className="bold">
                                                                            {!shipping.name ? (
                                                                                <>
                                                                                    No
                                                                                    name
                                                                                    was
                                                                                    found
                                                                                </>
                                                                            ) : (
                                                                                <>
                                                                                    {
                                                                                        shipping.name
                                                                                    }
                                                                                </>
                                                                            )}
                                                                            <br />
                                                                            {
                                                                                shipping.line1
                                                                            }
                                                                            <br />
                                                                            {
                                                                                shipping.city
                                                                            }
                                                                            ,{" "}
                                                                            {
                                                                                shipping.state
                                                                            }{" "}
                                                                            {
                                                                                shipping.postal_code
                                                                            }
                                                                            <br />
                                                                            {
                                                                                shipping.country
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                )}
                                                            </>
                                                        ) : (
                                                            <> </>
                                                        )}
                                                    </>
                                                </div>

                                                <div
                                                    style={{
                                                        display: "flex",
                                                        justifyContent:
                                                            "center",
                                                    }}
                                                    className="col s12 hide-on-med-and-up"
                                                >
                                                    <p
                                                        className="flow-text"
                                                        style={{
                                                            fontSize: "16px",
                                                            fontWeight: "bold",
                                                        }}
                                                    >
                                                        {
                                                            data.getOrderById
                                                                .products![j]
                                                                .name
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                        </>
                                    );
                                }
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
