import React from "react";

class DrinkForm extends React.Component {
    render() {
        return(
            <form onSubmit={this.props.getCocktail}>
                <input type="text" name="drink" placeholder="Drink Name..."/>
                <button>Get Cocktail!</button>
            </form>
        );
    }
}

export default DrinkForm;