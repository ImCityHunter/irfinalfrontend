import React from 'react';
class AdditionalInsert extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            additionalQuery:"",
            ingredients:[], // list of ingredients
            dishes:[], // list of dish {object}
        }
    }

    submit = (text) =>{
        this.props.submit(text);
    }

    render() {
        return(
            <div>
                <br/>
                <div className={'form-group row'}>

                    <label className={'col-sm-2 col-form-label'}>Additional Ingredients</label>
                    <input
                        className={'form-control col-sm-8'}
                        placeholder = "ingredient 01, ingredient02 ,.."
                        onChange={(e)=>{
                            let temp = e.target.value;
                            this.setState({
                                additionalQuery:temp
                            })
                        }} />
                    <button className={"col-sm-2"} onClick={()=>this.submit(this.state.additionalQuery)}> Submit Changes </button>
                </div>
                <br />



            </div>
        )
    }
}

export default AdditionalInsert