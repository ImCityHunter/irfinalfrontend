


import {invertedIndex} from './Variables';
import Tokenization from "./Tokenization";

/**
 * accept array of object (dish)
 * @param dishes
 */
const readData =  async (dishes) =>{
    console.log("THERE ARE MANY DISHES FOR TO BE INVERTED", dishes.length);
    for(let dish of dishes){
        let ingredients = [];
        if(dish.ingredients.length > 0) {
            ingredients = await Tokenization.generalTokenization(dish.ingredients);
            await indexing(dish._id, ingredients, dish);
        }
    }

    console.log("Inverted Index is built. size is", Object.keys(invertedIndex).length);
    //console.log(invertedIndex);
    setTimeout (await build_rank_arr(), 2000);

    console.log("rank_arr is build. size is", Object.keys(rank_arr).length);
}


// invertedIndex = {};
/*
invertedIndex = {
  'word' = {
      'dishes': {
          'dishId':{
              counts: 0,
              termFrequencies: log (count+1),
              tfxIdf: idf * tf
            },
      'idf':  log( total docs / num of doc appeared) =>
    }
  }
}
*/


const indexing = async (_id, ingredients, dish) => {
    let totalDocSize = ingredients.length;
    for( let word of ingredients) {
        // initialize
        if(invertedIndex[word] == undefined) {
            invertedIndex[word] = new Object();
            invertedIndex[word].dishes = new Object();
            invertedIndex[word].idf = 0;
            invertedIndex[word].word = word; // doesn't need
        }

        // initialize
        if(invertedIndex[word].dishes[_id] == undefined){
            invertedIndex[word].dishes[_id] = new Object();
            invertedIndex[word].dishes[_id].count = 0;
            invertedIndex[word].dishes[_id].tf = Math.log(1); // default
            invertedIndex[word].dishes[_id].tfxIdf = 0;
            invertedIndex[word].dishes[_id]._id = _id;
            invertedIndex[word].dishes[_id].title = dish.title;
            invertedIndex[word].dishes[_id].ingredients = dish.ingredients;
            invertedIndex[word].dishes[_id].instruction = dish.instruction;
        }

        // update count -> update tf -> update idf -> update idf*tf
        invertedIndex[word].dishes[_id].count++;
        invertedIndex[word].dishes[_id].tf = Math.log(invertedIndex[word].dishes[_id].count+1);
        invertedIndex[word].idf = Math.log( totalDocSize / Object.keys(invertedIndex[word].dishes).length);
        invertedIndex[word].dishes[_id].tfxIdf = invertedIndex[word].idf * invertedIndex[word].dishes[_id].tf;
    }

}


/*
 * rank_arr [
 *     dish = {
 *         title: '',
 *         ingredients: '',
 *         doc_score: 0,
 *         rank_score: 0,
 *         instruction:.
 *         _id:''
 *    }, {
 *
 *    }
 * ]
 *
 */
export const rank_arr = new Object();

const build_rank_arr = () =>{
    if(Object.keys(invertedIndex).length > 0) {
        for (let key in invertedIndex){
            let word = invertedIndex[key];
            if(word!=undefined){
                for(let key_2 in invertedIndex[key].dishes){
                    let dish = invertedIndex[key].dishes[key_2]; // get dish
                    let _id = dish._id;
                    if(rank_arr[_id]==undefined){
                        rank_arr[_id] = new Object();
                        rank_arr[_id].title = dish.title;
                        rank_arr[_id].ingredients = dish.ingredients;
                        rank_arr[_id].doc_score = dish.tfxIdf;
                        rank_arr[_id].rank_score = 0;
                        rank_arr[_id]._id = dish._id;

                        console.log()
                    } else {
                        rank_arr[_id].doc_score = rank_arr[_id].doc_score + dish.tfxIdf;
                    }
                }
            }
        }

    }
    else {
        console.log('Error in building Inverted Index');
    }

}





export default {
    readData, rank_arr
}