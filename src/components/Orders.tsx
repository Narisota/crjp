import { useState } from "react";
import {
    useGetOrdersQuery,
    useEditTrackingMutation,
} from "../generated/graphql";

const Orders = () => {
    const { data, loading, error } = useGetOrdersQuery();
    const [EditTracking] = useEditTrackingMutation();

    const [state, setState] = useState({ tracking: [] as any[] });

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

    console.log("data :>> ", data);

    data.getOrders.reverse();
  

    return (
        <div className="container">
            <table>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Tracking Number</th>
                        <th>Products Ordered</th>
                        <th>Order Total</th>
                    </tr>
                </thead>

                <tbody>
                    {data!.getOrders.map((_val, i) => {
                        let order: any = data?.getOrders[i];

                        if (order.warning) {
                            M.toast({
                                html: `Order #${order.order_id} has a warning`,
                            });
                        }

                        return (
                            <tr className={order.warning ? "red" : ""}>
                                <td>{order?.order_id}</td>
                                <td>
                                    <div className="row">
                                        <div className="col s7">
                                            <div className="row">
                                                <div className="input-field">
                                                    <input
                                                        id={`tracking-${i}`}
                                                        type="text"
                                                        value={
                                                            state.tracking[i]
                                                        }
                                                        onChange={e => {
                                                            let tmp: any[] =
                                                                state.tracking;
                                                            tmp[i] =
                                                                e.target.value;
                                                            setState({
                                                                ...state,
                                                                tracking: tmp,
                                                            });
                                                        }}
                                                    />
                                                    <label
                                                        htmlFor={`tracking-${i}`}
                                                    >
                                                        {order?.tracking_num ? (
                                                            <>
                                                                {
                                                                    order.tracking_num
                                                                }
                                                            </>
                                                        ) : (
                                                            <>NONE</>
                                                        )}
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                        <div
                                            className="col s4 offset-s1"
                                            style={{
                                                marginTop: "25px",
                                            }}
                                        >
                                            <button
                                                className="btn black"
                                                onClick={async () => {
                                                    if (state.tracking[i]) {
                                                        let tmp = await EditTracking(
                                                            {
                                                                variables: {
                                                                    order_id:
                                                                        order.order_id,
                                                                    new_tracking_num:
                                                                        state
                                                                            .tracking[
                                                                            i
                                                                        ],
                                                                },
                                                            }
                                                        );

                                                        if (!!tmp) {
                                                            if (
                                                                tmp.data
                                                                    ?.editTracking
                                                            ) {
                                                                window.location.reload();
                                                            } else {
                                                                M.toast({
                                                                    html:
                                                                        "Failed",
                                                                });
                                                                M.toast({
                                                                    html:
                                                                        "Contact me on discord",
                                                                });
                                                            }
                                                        } else {
                                                            M.toast({
                                                                html: "Failed",
                                                            });
                                                            M.toast({
                                                                html:
                                                                    "Contact me on discord",
                                                            });
                                                        }
                                                    } else {
                                                        console.log(
                                                            "undefined"
                                                        );
                                                    }
                                                }}
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {order?.products!.map(
                                        (_val2: any, j: any) => {
                                            return (
                                                <div className="row">
                                                    {order.products[j].name} x{" "}
                                                    {
                                                        order.products[j]
                                                            .quantityOrdered
                                                    }
                                                </div>
                                            );
                                        }
                                    )}
                                </td>

                                <td>
                                    $
                                    {Number(order.order_total / 100).toFixed(2)}
                                </td>

                                <td>
                                    <a
                                        href={`#/order-details:${order.order_id}`}
                                    >
                                        See Details
                                    </a>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default Orders;
