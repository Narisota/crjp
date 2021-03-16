import { useEffect, useState } from "react";
import {
    useAddCouponMutation,
    useDeleteCouponMutation,
    useGetCouponsQuery,
} from "../generated/graphql";
import M from "materialize-css";
const Coupons = () => {
    const { data, loading, error } = useGetCouponsQuery();
    const [addCoupon] = useAddCouponMutation();
    const [deleteCoupon] = useDeleteCouponMutation();
    const [name, setName] = useState("");
    const [discount, setDiscount] = useState("");
    const [refresh, setRefresh] = useState(false);
    const [fresh, setFresh] = useState(false);

    useEffect(() => {
        var elems = document.querySelectorAll(".modal");
        M.Modal.init(elems);

        elems = document.querySelectorAll(".dropdown-trigger");
        M.Dropdown.init(elems);

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

    return (
        <div className="container">
            <h1 className="center-align">Active Coupons</h1>
            {data?.getCoupons.length === 0 ? (
                <h4 className="center-align">NONE</h4>
            ) : (
                <>
                    {data?.getCoupons.map((_val, i) => {
                        return (
                            <>
                                <div
                                    className="container"
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <h4 className="center-align">
                                        {data.getCoupons[i].coupon_name}
                                    </h4>

                                    <h5 className="center-align">
                                        -
                                        {data.getCoupons[i].discount
                                            ? data.getCoupons[i].discount
                                            : 0}
                                        %
                                    </h5>
                                    <i
                                        className="material-icons red-text"
                                        onClick={async () => {
                                            let tmp = await deleteCoupon({
                                                variables: {
                                                    coupon_name:
                                                        data.getCoupons[i]
                                                            .coupon_name,
                                                },
                                            });

                                            if (!tmp!.data!.deleteCoupon) {
                                                M.toast({
                                                    html: "An error occured",
                                                });

                                                M.toast({
                                                    html:
                                                        "Could not delete coupon",
                                                });
                                            } else {
                                                window.location.reload();
                                            }
                                        }}
                                    >
                                        delete
                                    </i>
                                </div>
                            </>
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
                    Add a coupon
                </button>
            </div>

            {refresh ? (
                <>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            width: "100%",
                            marginTop: "24px",
                        }}
                    >
                        <a
                            className="dropdown-trigger btn black"
                            href="#"
                            data-target="dropdown1"
                        >
                            {fresh ? (
                                <>Coupon Type: Free Shipping</>
                            ) : (
                                <>Coupon Type: Discount</>
                            )}
                        </a>
                    </div>

                    <ul id="dropdown1" className="dropdown-content">
                        <li
                            onClick={() => {
                                setFresh(false);
                            }}
                        >
                            discount
                        </li>
                        <li
                            onClick={() => {
                                setFresh(true);
                                setDiscount("FREE_SHIPPING");
                            }}
                        >
                            free shipping
                        </li>
                    </ul>

                    <div className="row" style={{ marginTop: "32px" }}>
                        <div className="col s6">
                            <div className="input-field">
                                <input
                                    id="coupon_name"
                                    type="text"
                                    className="validate"
                                    value={name}
                                    onChange={e =>
                                        setName(e.target.value.toLowerCase())
                                    }
                                />
                                <label htmlFor="coupon_name">Coupon Name</label>
                                <span
                                    className="helper-text"
                                    data-error="Please enter a coupon name"
                                ></span>
                            </div>
                        </div>
                        <div className="col s6">
                            {fresh ? (
                                <></>
                            ) : (
                                <div className="input-field">
                                    <input
                                        id="discount"
                                        type="text"
                                        className="validate"
                                        minLength={0}
                                        maxLength={2}
                                        value={discount}
                                        onChange={e => {
                                            if (!e.target.value) {
                                                setDiscount("0");
                                            }
                                            if (e.target.value.match(/\d/g)) {
                                                setDiscount(e.target.value);
                                            }
                                        }}
                                    />
                                    <label htmlFor="discount">
                                        Discount(Percentage in Numbers)
                                    </label>
                                    <span
                                        className="helper-text"
                                        data-error="Please enter a discount amount"
                                    ></span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            width: "100%",
                        }}
                    >
                        <button
                            className="btn green center-align"
                            onClick={async () => {
                                if (
                                    name.length === 0 ||
                                    discount.length === 0
                                ) {
                                    if (name.length === 0) {
                                        document
                                            .getElementById("coupon_name")!
                                            .classList.add("invalid");
                                    }
                                    if (!fresh && discount.length === 0) {
                                        document
                                            .getElementById("discount")!
                                            .classList.add("invalid");
                                    }
                                } else {
                                    if (!fresh) {
                                        let tmp = await addCoupon({
                                            variables: {
                                                coupon_name: name,
                                                discount,
                                            },
                                        });
                                        if (!tmp!.data!.addCoupon) {
                                            M.toast({
                                                html: "An error occured",
                                            });
                                            M.toast({
                                                html: "Could not add coupon",
                                            });
                                        } else {
                                            window.location.reload();
                                        }
                                    } else {
                                        let tmp = await addCoupon({
                                            variables: {
                                                coupon_name: name,
                                                discount: "FREE_SHIPPING",
                                            },
                                        });
                                        console.log("tmp :>> ", tmp);
                                        if (!tmp!.data!.addCoupon) {
                                            M.toast({
                                                html: "An error occured",
                                            });
                                            M.toast({
                                                html: "Could not add coupon",
                                            });
                                        } else {
                                            window.location.reload();
                                        }
                                    }
                                }
                            }}
                        >
                            confirm
                        </button>
                    </div>
                </>
            ) : (
                <></>
            )}
        </div>
    );
};

export default Coupons;
