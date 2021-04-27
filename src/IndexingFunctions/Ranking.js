import Tokenization from "./Tokenization";

import {rank_arr} from './BuildIndex'
import {invertedIndex} from './Variables';
/*
 * rank_arr [
 *     dish = {
 *         title: '',
 *         ingredients: '',
 *         doc_score: 0,
 *         rank_score: 0,
 *         instruction:.
 *         _id:''
 *    }
 * ]
 *
 */



const ingredientsArr  = (query) =>{
    return query.split(',')
}


const ranking = async (query) =>{
    console.log("Inserted Query");

    let arr = [];
    arr = await Tokenization.generalTokenization(query);




    for(let word of arr){
        if(invertedIndex[word]!=undefined){
            let dishes = invertedIndex[word].dishes;
            for(let key in dishes){
                let dish = dishes[key];
            }
        }
    }


    for(let key in rank_arr){
        let dish = rank_arr[key];
        let _id = dish._id;
        for(let word of arr){
            if(invertedIndex[word]!=undefined){
                let index_dish = invertedIndex[word].dishes[_id];
                if(index_dish!=undefined){
                    dish.rank_score = dish.rank_score + index_dish.tfxIdf;
                }
            }
        }
        dish.rank_score = dish.rank_score / dish.doc_score;
    }

    let result = [];
    result = await sort_rank_score(rank_arr);
    return result;

}

const sort_rank_score = (rank_arr) => {
    if(rank_arr == undefined || rank_arr.length < 10) {
        console.log('error in rank_arr creation');
        return [];
    }

    const arr = [];
    for( let key in rank_arr){
        let obj = rank_arr[key];
        arr.push(obj);
    }

    arr.sort(function(a,b){
        return a.doc_score - b.doc_score
    })

    return arr;

}

export default {
    ranking, ingredientsArr
}