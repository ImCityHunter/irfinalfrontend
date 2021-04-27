import React from 'react';

import {
    Link,
} from "react-router-dom";

class SearchPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            queryText:"",
            searchType:''
        }
    }


    render() {
        return(
            <div>
                <form>
                    <div className={'form-group row'}>
                        <label className={'col-form-label col-sm-2'}> Type of Search </label>
                        <select className={'col-sm-10'} defaultValue={'20'}
                                onChange={(e)=>{
                                    let tmp = e.target.value;
                                    this.setState({
                                        searchType:tmp
                                    })
                                }}
                        >
                            <option value='TITLE'>Search By Dish Name</option>
                            <option value='INGREDIENTS'>What's In Your Fridge (Ingredients)</option>
                        </select>
                    </div>
                    <div className={'form-group row'}>
                        <label className={'col-sm-2 col-form-label'}>QueryText</label>
                        <input
                            className={'form-control col-sm-10'}
                            placeholder = "query text"
                            onChange={(e)=>{
                                let temp = e.target.value;
                                this.setState({
                                    queryText:temp
                                })
                            }} />
                    </div>
                    <Link to={{
                        pathname: '/search',
                        state:{
                            queryText: this.state.queryText,
                            searchType: this.state.searchType
                        }
                        //queryText: this.state.queryText,
                        //searchType: this.state.searchType
                    }} className={'btn btn-info'}>Search</Link>

                </form>
            </div>
        )
    }
}

export default SearchPage;