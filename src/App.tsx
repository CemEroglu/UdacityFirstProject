import React, {useState} from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";	
import home from './screens/homepage'
const Project = () => {
  
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={home} />
            </Switch>
        </Router>
    );
}
export default Project;