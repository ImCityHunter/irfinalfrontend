
import React from 'react';
import {
    BrowserRouter as Router,
    Link,
    Route,
    Switch
} from "react-router-dom";

import SearchPage from "./SearchPage";
import SearchResultPage from "../searchResult/SearchResultPage";
class Homepage extends  React.Component{

    constructor(props) {
        super(props);
        this.state = {
            queryText:""
        }
    }

    render() {
        return(
            <div className={'container'}>
            <br/>
                <h1>What's in your Fridge?</h1>
                <Router>
                    <Switch>
                        <Route exact = {true} path = "/">
                            <SearchPage/>
                        </Route>
                        <Route exact = {true} path = "/search" >
                            <SearchResultPage/>
                        </Route>
                    </Switch>
                </Router>
            </div>
        )
    }
}


export default Homepage;