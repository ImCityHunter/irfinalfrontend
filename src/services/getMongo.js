

const url = 'http://localhost:4200'

const getDish_url  = (id) => `${url}/dish/${id}`;



// input is array of dish_id
export const getAllDish = (arr) =>{
    let result = [];
    for (let id of arr){
        let dish = getDish(id);
        result.push(dish);
    }
    console.log(result);
    return result;
}



export const getDish = async (id) =>{
    //console.log('getting dish for :' +id);
    let dish = await fetch(getDish_url(id)).then(response=>response.json());
    //console.log(dish)
    return dish;
}

export default {
    getAllDish, getDish
}