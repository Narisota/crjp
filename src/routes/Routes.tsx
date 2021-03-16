import { Redirect, Switch } from "react-router";
import { Route } from "react-router-dom";
import AddProducts from "../components/Products/AddProducts";
import EditProduct from "../components/Products/EditProduct";
import EditSocials from "../components/Social/EditSocials";
import OrderDetails from "../components/Orders/OrderDetails";
import Orders from "../components/Orders/Orders";
import Products from "../components/Products/Products";
import Utils from "../components/UserUtils/Utils";
import AuthRoute from "./AuthRoute";
import Sections from "../components/Sections/Sections";
import AddSection from "../components/Sections/AddSection";
import EditSection from "../components/Sections/EditSection";

const Routes = () => {
    return (
        <Switch>
            <AuthRoute exact path="/orders" component={Orders} />
            <AuthRoute exact path="/products" component={Products} />
            <AuthRoute exact path="/add-products" component={AddProducts} />
            <AuthRoute exact path="/edit-product:id" component={EditProduct} />
            <AuthRoute exact path="/utils" component={Utils} />
            <AuthRoute exact path="/edit-socials" component={EditSocials} />
            <AuthRoute exact path="/sections" component={Sections} />
            <AuthRoute exact path="/add-sections" component={AddSection} />
            <AuthRoute exact path="/edit-section:id" component={EditSection} />
            <AuthRoute
                exact
                path="/order-details:id"
                component={OrderDetails}
            />
            <Route render={() => <Redirect to="/products" />} />
        </Switch>
    );
};

export default Routes;
