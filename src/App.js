import React from 'react';
import './App.css';
import Titles from "./components/Title/Title";
import Form1 from "./components/Form/Form1";
import Form2 from "./components/Form/Form2";
import Cocktail from "./components/Cocktail/Cocktail";
import Random from "./components/Random/Random";

class App extends React.Component{
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

    setValidData(process_data){
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

    setError1(string){
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

    setError2(string){
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
      const api_call = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`);
      const process_data = await api_call.json();
      console.log(process_data);
      try{
        if (drink){
          this.setValidData(process_data);
        }
        else{
          this.setError1('Please enter a drink name...');
        }
      }
      catch(err){
        this.setError2('The drink name you entered was not found...');
      }
    }
    
    getCocktailByIngredient = async (e) => {
      e.preventDefault();
      const ingredient = e.target.elements.ingredient.value;
      const api_call = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
      const process_data = await api_call.json();
      console.log(process_data);
      try{
        if (ingredient){
            const api_call = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${process_data.drinks[0].strDrink}`);
            const process_data = await api_call.json();
            this.setValidData(process_data);
            console.log(process_data);
          }
          else{
            this.setError1('Please enter an ingredient...');
          }
        }
        catch(err){
          this.setError2('The ingredient you entered was not found...');
        }
      }
  
    getRandom = async (e) => {
        e.preventDefault();
        const api_call = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/random.php`);
        const process_data = await api_call.json();
        this.setValidData(process_data);
      }  
  
  render(){
    return(
      <div>
        <Titles/>
        <div class="search-options-row">
          <div class="search-options-column">
            <p>Search Cocktail By Name:</p>
            <Form1 getCocktail={this.getCocktailByName}/>
          </div>
          <div class="search-options-column">
            <p>Search Cocktail By Ingredient:</p>
            <Form2 getCocktail={this.getCocktailByIngredient}/>
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