

import {stemmer} from 'stemmer';

const generalTokenization = ( rawText ) =>{
    //console.log(rawText);
    rawText = rawText.replace('AND',' ');
    rawText = rawText.replace(/[\d+]/g,"").toLowerCase(); // remove digits
    let words = rawText.split(/[\[\]<>.,\/#!$%\^&\*;:{}=_()?@\s\"\-]/g); // split all punctuations marks
    let arr = [];
    for (let word of words){
        word = stemmer(word);
        if(word.length>1){
            arr.push(word);
        }
    }
    //console.log("TOKENIZED INGREDIENT", arr.toString());
    return arr;
}




export default {
    generalTokenization
}
