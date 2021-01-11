import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";	
import home from './screens/homepage'
import search from './screens/searchpage'
const Project = () => {
  
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={home} />
                <Route path="/search" exact component={search} />
            </Switch>
        </Router>
    );
}
export default Project;