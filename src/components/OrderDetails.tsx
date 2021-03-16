import { useGetOrderByIdQuery } from "../generated/graphql";
import { useMemo, useState } from "react";

const calcProdSubtotal = (products: any[]) => {
    let subtotal = 0;

    for (let i = 0; i < products.length; i++) {
        subtotal += products[i].productSubtotal!;
    }

    return Number(subtotal / 100).toFixed(2);
};

const OrderDetails = () => {
    let id;
    if (process.env.NODE_ENV === "production") {
        id = window.location.href.split(":")[2];
    } else {
        id = window.location.href.split(":")[3];
    }

    const { data, loading, error } = useGetOrderByIdQuery({
        variables: {
            order_id: Number(id),
        },
    });

    const [state, setState] = useState(false);

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

    console.log("id", id);

    const productsSubtotal = calcProdSubtotal(data.getOrderById.products!);

    let amountOff = Number(
        (data.getOrderById.order_total! *
            Number("0." + data.getOrderById.discount)) /
            100
    ).toFixed(2);

    return (
        <div className="container">
            <h4>Order Details</h4>
            <div className="divider"></div>
            <span>
                <span>
                    <strong style={{ fontWeight: "bold" }}>
                        Purchase Date:
                    </strong>{" "}
                    {!data.getOrderById.date_of_purchase ? (
                        <></>
                    ) : (
                        <>{data.getOrderById.date_of_purchase}</>
                    )}
                </span>

                <span style={{ marginLeft: "30px" }}>
                    <strong style={{ fontWeight: "bold" }}>Total:</strong> $
                    {!data.getOrderById.order_total ? (
                        <span
                            className="red-text"
                            style={{ fontWeight: "bold" }}
                        >
                            ERROR
                        </span>
                    ) : (
                        Number(data!.getOrderById!.order_total! / 100).toFixed(
                            2
                        )
                    )}
                </span>

                <span
                    style={{ color: "#0457c8" }}
                    className="right"
                    onClick={() => setState(!state)}
                >
                    Payment Details
                </span>
            </span>

            {!data.getOrderById.warning ? (
                <></>
            ) : (
                <>
                    <div className="row">
                        <div className="col s12 ">
                            <div className="card">
                                <div className="card-content">
                                    <span
                                        className="card-title red-text"
                                        style={{ fontWeight: "bold" }}
                                    >
                                        WARNING
                                    </span>
                                    <p className="flow-text">
                                        {data.getOrderById.warning}
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
                        <div className="col s12">
                            <div className="card">
                                <div className="card-content">
                                    <div className="row">
                                        <div className="col s6">
                                            <span className="card-title">
                                                Payment Method
                                            </span>

                                            <div className="divider"></div>
                                        </div>

                                        <div className="col s4 offset-s1">
                                            <span className="card-title">
                                                Order Summary
                                            </span>

                                            <div className="divider"></div>

                                            <div>
                                                <span className="left bold">
                                                    Products Total
                                                </span>
                                                <span className="right">
                                                    ${productsSubtotal}
                                                </span>
                                            </div>

                                            <br />

                                            <>
                                                {!data.getOrderById.coupon ? (
                                                    <></>
                                                ) : (
                                                    <>
                                                        <div
                                                            style={{
                                                                width: "100%",
                                                                fontWeight:
                                                                    "bold",
                                                            }}
                                                        >
                                                            <span className="left">
                                                                Discounts
                                                            </span>
                                                        </div>

                                                        <br />
                                                        <div className="divider"></div>
                                                        <span className="left bold">
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
                                            <div className="divider"></div>
                                            <span className="left bold">
                                                Order Total
                                            </span>
                                            <span className="right">
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
        </div>
    );
};

export default OrderDetails;
