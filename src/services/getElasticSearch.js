// currently the server is not uploaded, must start the server locally
import getMongo, {getAllDish} from "./getMongo";

const url = 'http://localhost:4200';

// the url for the search, i set the API in the server
const url_searchTitle = (query) => `${url}/elastic/dish/${query}/searchTitle`;
const url_searchIngredients = (query) => `${url}/elastic/dish/${query}/searchIngredients`;

// this is just a `hello world` testing
export const get = () =>{
    return fetch(url).then((response)=>{
        let msg = response.json()
        return msg;
    });
}

// this is the main function the fetch meaning data
export const searchTitle = async (query) =>{
    console.log(url_searchTitle(query));
    let arr = []
    arr = await fetch(url_searchTitle(query)).then((response) =>
        response.json() // arry of strings
    );

    return arr;
}

export const searchIngredients = async(query) =>{

    let arr = []
    console.log(url_searchIngredients(query));
    arr = await fetch(url_searchIngredients(query)).then((response) =>{
        arr = response.json(); // arry of strings
        return arr;
    });

    return arr;
}


export default {
    searchTitle, searchIngredients
}

