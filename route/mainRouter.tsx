import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Header from "../components/public/header/header";

const MainRouter = () => {
    return(
        <Router>
            <Switch>
                <Header />
            </Switch>
        </Router>
    )
}

export default MainRouter;