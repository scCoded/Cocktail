import React from "react";
class Form2 extends React.Component{
    render(){
        return(
            <form onSubmit={this.props.getCocktail}>
                <input type="text" name="ingredient" placeholder="Ingredient Name..."/>
                <button>Get Cocktail!</button>
            </form>
        );
    }
}

export default Form2;