import React from 'react';
import './App.css';
import Titles from "./components/Title/Title";
import DrinkForm from "./components/FormSections/DrinkForm";
import IngredientForm from "./components/FormSections/IngredientForm";
import CocktailBoard from "./components/CocktailBoard/CocktailBoard";
import Random from "./components/FormSections/Random";

class App extends React.Component {

  // state/data of current drink on the cocktail board
  state = {
    nameOfDrink: undefined,
    method: undefined,
    ingredients:undefined,
    photo: undefined,
    alcoholic: undefined,
    category: undefined,
    glass: undefined, 
    error: undefined
  }

    // set data from a drink, from the normal cocktail getter api
    setValidData(process_data) {
      this.setState({
        nameOfDrink : process_data.drinks[0].strDrink,
        method : process_data.drinks[0].strInstructions,
        ingredients: [
          [process_data.drinks[0].strIngredient1, process_data.drinks[0].strMeasure1], 
          [process_data.drinks[0].strIngredient2, process_data.drinks[0].strMeasure2], 
          [process_data.drinks[0].strIngredient3, process_data.drinks[0].strMeasure3],
          [process_data.drinks[0].strIngredient4, process_data.drinks[0].strMeasure4], 
          [process_data.drinks[0].strIngredient5, process_data.drinks[0].strMeasure5],
          [process_data.drinks[0].strIngredient6, process_data.drinks[0].strMeasure6], 
          [process_data.drinks[0].strIngredient7, process_data.drinks[0].strMeasure7],
          [process_data.drinks[0].strIngredient8, process_data.drinks[0].strMeasure8], 
          [process_data.drinks[0].strIngredient9, process_data.drinks[0].strMeasure9], 
          [process_data.drinks[0].strIngredient10, process_data.drinks[0].strMeasure10], 
          [process_data.drinks[0].strIngredient11, process_data.drinks[0].strMeasure11], 
          [process_data.drinks[0].strIngredient12, process_data.drinks[0].strMeasure12], 
          [process_data.drinks[0].strIngredient13, process_data.drinks[0].strMeasure13],
          [process_data.drinks[0].strIngredient14, process_data.drinks[0].strMeasure14],
          [process_data.drinks[0].strIngredient15, process_data.drinks[0].strMeasure15], 
        ],
        alcoholic: process_data.drinks[0].strAlcoholic,
        category: process_data.drinks[0].strCategory,
        glass: process_data.drinks[0].strGlass, 
        photo : process_data.drinks[0].strDrinkThumb,
        error : ""
      });
    }

    getCocktailById(process_data) {
    
    }

    setEmptyError(string) {
      this.setState({
        nameOfDrink : undefined,
        method : undefined,
        ingredients:undefined,
        photo: undefined,
        alcoholic: undefined,
        category: undefined,
        glass: undefined, 
        error : string
      });
    }

    setNotFoundPropertyError(string) {
      this.setState({
        nameOfDrink : undefined,
        method : undefined,
        ingredients:undefined,
        photo : undefined,
        alcoholic: undefined,
        category: undefined,
        glass: undefined, 
        error : string
      });
    }

    getCocktailByName = async (e) => {
      e.preventDefault();
      const drink = e.target.elements.drink.value;
      if (drink) {
        try {
          const api_call = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`);
          const process_data = await api_call.json();
          this.setValidData(process_data);
        } catch(err) {
          this.setNotFoundPropertyError('The drink name you entered was not found...');
        }
      } else {
        this.setEmptyError('Please enter a drink name...');
      }
    }
    
    getCocktailByIngredient = async (e) => {
      e.preventDefault();
      const ingredient = e.target.elements.ingredient.value;
      if (ingredient) {
        try {
        // calling drink by ingredient in ingredient form section.
        const api_call = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
        const process_data = await api_call.json();
        const drinkId = process_data.drinks[0].idDrink;
        // calling drink by id found via ingredient call response.
        const api_call2 = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`);
        const process_data2 = await api_call2.json();
        this.setValidData(process_data2);
        } catch(err) {
          this.setNotFoundPropertyError('The ingredient you entered was not found...');
        }
      } else {
        this.setEmptyError('Please enter an ingredient...');
      }
    }
    getRandom = async (e) => {
        e.preventDefault();
        const api_call = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/random.php`);
        const process_data = await api_call.json();
        this.setValidData(process_data);
      }  
  
  render() {
    return(
      <div>
        <Titles/>
        <div className="search-options-row">
          <div className="search-options-column">
            <p>Search Cocktail By Name:</p>
            <DrinkForm getCocktail={this.getCocktailByName}/>
          </div>
          <div className="search-options-column">
            <p>Search Cocktail By Ingredient:</p>
            <IngredientForm getCocktail={this.getCocktailByIngredient}/>
          </div>
          <div className="search-options-column last">
            <p>If you're feeling spontaneous:</p>
            <Random getRandom={this.getRandom}/>
          </div>
        </div>
        <CocktailBoard 
        nameOfDrink={this.state.nameOfDrink}
        method={this.state.method}
        ingredients={this.state.ingredients}
        photo={this.state.photo}
        alcoholic = {this.state.alcoholic}
        category = {this.state.category}
        glass= {this.state.glass}
        error = {this.state.error}      
        />
    </div>
    );
  }
}

export default App;