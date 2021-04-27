
import React from 'react';
import {Nav, Button} from "react-bootstrap";
class ShowIngredientTopic extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            ingredient:''
        }
    }

    componentDidMount() {
        this.setState({
            ingredient:this.props.ingredient
        })
    }

    delete = (text) =>{
        this.props.deleteIngredient(text);
    }

    render() {
        return(
            <Nav.Item className={'mr-2'}>
                <Nav.Link>
                    <span>{this.state.ingredient}</span>
                    <span onClick={()=>this.delete(this.state.ingredient)}> X </span>
                </Nav.Link>
            </Nav.Item>
        )
    }
}

export default ShowIngredientTopic;