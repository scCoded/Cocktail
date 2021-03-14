import React from 'react';
import './App.css';
import Titles from "./components/Title/Title";
import Form from "./components/Form/Form";
import Cocktail from "./components/Cocktail/Cocktail";
import Random from "./components/Random/Random";

class App extends React.Component{
  state = {
    nameOfDrink: undefined,
    method: undefined,
    ingredients:undefined,
    photo: undefined, 
    error: undefined
  }
  
  getCocktail = async (e) => {
    e.preventDefault();
    const drink = e.target.elements.drink.value;
    const api_call = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`);
    const process_data = await api_call.json();
    try{
      if (drink){
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
          photo : process_data.drinks[0].strDrinkThumb,
          error : ""
        });
      }
      else{
        this.setState({
          nameOfDrink : undefined,
          method : undefined,
          ingredients:undefined,
          photo: undefined,
          error : "Please enter the name of the drink..."
        });
      }
      
    }
    catch(err){
      this.setState({
        nameOfDrink : undefined,
        method : undefined,
        ingredients:undefined,
        photo : undefined,
        error : "The name you entered was not found..."
      });
    }
    
  }
  
  getRandom = async (e) => {
    e.preventDefault();
    const api_call = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/random.php`);
    const process_data = await api_call.json();
    console.log(process_data.drinks[0]);
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
          photo : process_data.drinks[0].strDrinkThumb,
          error : ""
        });
     
    }
  
  render(){
    return(
      <div>
        <Titles/>
        <div class="search-options-row">
          <div class="search-options-column">
            <p>Search Cocktail By Name:</p>
            <Form getCocktail={this.getCocktail}/>
          </div>
          <div class="search-options-column">
            <p>Search Cocktail By Ingredient:</p>
            <button>TODO</button>
          </div>
          <div class="search-options-column last">
            <p>If you're feeling spontaneous:</p>
            <Random getRandom={this.getRandom}/>
          </div>
        </div>
        <Cocktail 
        nameOfDrink={this.state.nameOfDrink}
        method={this.state.method}
        ingredients={this.state.ingredients}
        photo={this.state.photo}
        error = {this.state.error}
        />
    </div>
    );
  }
}

export default App;