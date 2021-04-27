

import React from 'react';
import getElasticSearch from "../services/getElasticSearch";
import { CardDeck, Nav } from 'react-bootstrap';
import ShowCardsComponent from "./ShowCardsComponent";
import getMongo from "../services/getMongo";
import BuildIndex from "../IndexingFunctions/BuildIndex";
import AdditionalInsert from "./AdditionalInsert";
import Ranking from "../IndexingFunctions/Ranking";
import ShowIngredientTopic from "./ShowIngredientTopic";
class ShowResultContainer extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            query : '',
            searchType:'TITLE',
            rankArr:[],
            dishes:[],
            additionalQuery:'',
            ingredientsArr:[]
        }
    }

    ingredientsArr = async (text) =>{
        const arr = await Ranking.ingredientsArr(text);
        this.setState({
            ingredientsArr: this.state.ingredientsArr.concat(arr)
        })

    }

    deleteIngredient = (ingredient) =>{
        const arr = this.state.ingredientsArr.filter((item)=>{
            return item!=ingredient;
        })
        this.setState({
            ingredientsArr:arr
        })
    }

    submit = async (text)=>{
        const ranked_dishes = await Ranking.ranking(text);
        await this.ingredientsArr(text);
        console.log(ranked_dishes);
        this.setState({
            dishes:ranked_dishes
        })
    }
    componentDidMount() {
        this.additionalRender();
    }

    additionalRender = async ()=>{
        let rankArr = (this.props.searchType === "INGREDIENTS") ?
            await getElasticSearch.searchIngredients(this.props.query):
            await getElasticSearch.searchTitle(this.props.query);
        await this.setState({
            query: this.props.query,
            searchType: this.props.searchType,
            rankArr: rankArr
        })
        for(let id of rankArr){
            let dish = await getMongo.getDish(id);
            this.setState( prevState=>({
                dishes:[ ... prevState.dishes, dish]
            }))
        }

        await BuildIndex.readData(this.state.dishes);
    }


    render() {
        return(
            <div>
                {/*<h1>Result</h1>*/}
                <AdditionalInsert
                    submit = {this.submit}
                />


                <Nav variant={"pills"}>


                    {this.state.ingredientsArr!==undefined && this.state.ingredientsArr.map (ingredient=>
                        <ShowIngredientTopic deleteIngredient = {this.deleteIngredient} ingredient={ingredient}/>)}

                </Nav>

                <br />
                <CardDeck>
                    {
                       this.state.dishes!==undefined && this.state.dishes.map( dish=><ShowCardsComponent dish={dish} key={dish._id}/>)
                    }
                </CardDeck>
            </div>
        )
    }
}

export default ShowResultContainer;