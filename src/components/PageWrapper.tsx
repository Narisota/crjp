import "../css/pageWrapper.scss";
import Navbar from "./Navbar";
interface Props {
    children?: any;
}

const PageWrapper: React.FC<Props> = ({ children }) => {
    return (
        <div className="pageWrapper">
            <Navbar />
            {children ? children : <></>}
        </div>
    );
};

export default PageWrapper;
