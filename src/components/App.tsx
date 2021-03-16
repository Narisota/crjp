import { checkAuth } from "../routes/AuthRoute";
import PageWrapper from "./PageWrapper";
import Routes from "../routes/Routes";
import Login from "./Login";
import {
    HashRouter as Router,
    Route,
    Redirect,
    Switch,
} from "react-router-dom";

const App = () => {
    return (
        <Router>
            <div className="App">
                {checkAuth() ? (
                    <PageWrapper children={<Routes />} />
                ) : (
                    <Switch>
                        <Route exact path="/login" component={Login} />
                        <Route render={() => <Redirect to="/login" />} />
                    </Switch>
                )}
            </div>
        </Router>
    );
};

export default App;
