import React from 'react';

import {Card, Collapse, Nav} from 'react-bootstrap';
import { Button } from 'react-bootstrap';


class ShowCardsComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dish:{},
            open:false,
            ingredients:[]
        }
    }


    setOpen(){
        this.setState({
            open:!this.state.open
        })
    }


    prettifyIngredients = (text) =>{
        const arr = text.split('AND')
        this.setState({
            ingredients:arr
        })
    }

    componentDidMount() {
       //this.getDish(this.props.id)

        this.additionRender()


    }

    additionRender = async () =>{

        await this.setState({
            dish: this.props.dish
        })

        await this.prettifyIngredients(this.state.dish.ingredients)

    }


    render() {
        return (
            <div>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="https://png.pngtree.com/png-vector/20190130/ourmid/pngtree-hand-drawn-cute-cartoon-burger-with-food-elements-elementlovely-foodcartoon-foodhand-png-image_613521.jpg" />
                    <Card.Body>
                        <Card.Title> {this.state.dish.title}</Card.Title>
                        <Card.Text>
                            Instruction: < br />
                            {this.state.dish.instruction}
                        </Card.Text>

                        <Collapse in={this.state.open}>
                            <Card.Text>
                                Ingredients:
                                < br />
                                {
                                    this.state.ingredients && this.state.ingredients.map(item=>
                                        <div> - {item} </div>
                                    )

                                }
                            </Card.Text>
                        </Collapse>

                        <Button
                            className={'float-right'}
                            variant={"primary"}
                            onClick={() => this.setOpen()}
                            aria-controls="example-fade-text"
                            aria-expanded={this.state.open}
                        >
                            Show More
                        </Button>




                    </Card.Body>
                </Card>
            </div>
        );
    }
}


export default ShowCardsComponent;