import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Header from "../components/public/header/header";
import Signin from "../components/login/signin/signin";
import Signup from "../components/login/signup/signup";
import Main from "../components/main/main";

const MainRouter = () => {
    return(
        <Router>
            <Switch>
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/signin" component={Signin} />
                <>
                    <Header />
                    <Route exact path="/" component={Main} />  
                </>
            </Switch>
        </Router>
    )
}

export default MainRouter;