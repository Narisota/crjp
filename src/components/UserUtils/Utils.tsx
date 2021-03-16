import Announcements from "./Announcements";
import Coupons from "./Coupons";
import EditUsers from "./EditUsers";
import Maintenance from "./Maintenance";

const Utils = () => {
    return (
        <div>
            <Maintenance />

            <Divider />

            <Coupons />

            <Divider />

            <Announcements />

            <Divider />

            <EditUsers />

            <Divider />
        </div>
    );
};

const Divider = () => {
    return (
        <div className="centered">
            <div className="container" style={{ margin: 45 }}>
                <div className="divider" style={{ color: "black" }}></div>
            </div>
        </div>
    );
};

export default Utils;
