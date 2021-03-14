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
          photo : process_data.drinks[0].strDrinkThumb,
          error : ""
        });
      }
      else{
        this.setState({
          nameOfDrink : undefined,
          method : undefined,
          photo: undefined,
          error : "Please enter the name of thedrink..."
        });
      }
      
    }
    catch(err){
      this.setState({
        nameOfDrink : undefined,
        method : undefined,
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
        photo={this.state.photo}
        error = {this.state.error}
        />
    </div>
    );
  }
}

export default App;