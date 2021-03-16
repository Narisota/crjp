import {
    useGetMaintenanceQuery,
    useToggleMaintenanceMutation,
} from "../generated/graphql";

const Maintenance = () => {
    const { data, loading, error } = useGetMaintenanceQuery();
    const [toggleMaintenance] = useToggleMaintenanceMutation();
    if (loading) {
        return <>...loading</>;
    } else if (!data || error) {
        return (
            <div className="container">
                <h5>Maintenance: ERR</h5>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="centered" style={{ marginTop: "32px" }}>
                <h4>
                    <span className="switch">
                        Maintenance:{" "}
                        {data.getMaintenance ? (
                            <label>
                                Off
                                <input type="checkbox" checked />
                                <span
                                    className="lever"
                                    onClick={async () => {
                                        await toggleMaintenance();
                                        window.location.reload();
                                    }}
                                ></span>
                                On
                            </label>
                        ) : (
                            <label>
                                Off
                                <input type="checkbox" />
                                <span
                                    className="lever"
                                    onClick={async () => {
                                        await toggleMaintenance();
                                        window.location.reload();
                                    }}
                                ></span>
                                On
                            </label>
                        )}
                    </span>
                </h4>
            </div>
        </div>
    );
};

export default Maintenance;
