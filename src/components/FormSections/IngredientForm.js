import React from "react";

class IngredientForm extends React.Component {
    render() {
        return(
            <form onSubmit={this.props.getCocktail}>
                <input type="text" name="ingredient" placeholder="Ingredient Name..."/>
                <button>Get Cocktail!</button>
            </form>
        );
    }
}

export default IngredientForm;