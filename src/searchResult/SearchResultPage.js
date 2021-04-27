import React from 'react';

import {useLocation} from 'react-router-dom';


import ShowResultContainer from "./ShowResultContainer";
const SearchResultPage  = () => {
    const location = useLocation();
    const query = location.state.queryText;
    const searchType = location.state.searchType;


    return (
            <div>
                <h3> Origin Query:  {query} </h3>
                <ShowResultContainer query = {query}
                                     searchType={searchType}/>
            </div>
    )
}

export default SearchResultPage;