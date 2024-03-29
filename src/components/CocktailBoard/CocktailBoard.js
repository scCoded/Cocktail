import React from "react";

class Cocktail extends React.Component {
    getMethod(str) {
        str = str.replace(/(\S\.|[!])\s*([A-Z])/g, "$1\n$2");
        return str;
    }

    getIngredients(ingredients) {
        let string = "";
        let count = 1;
        for (var i = 0; i < ingredients.length; i++) {
            if(ingredients[i][0] != null && ingredients[i][0]!=""){
                if (ingredients[i][1] != null && ingredients[i][1] != "") {
                    string+= count.toString() + ". " + ingredients[i][0] + " (" + ingredients[i][1] + ") \n"
                } else { 
                    string+= count.toString() + ". " + ingredients[i][0] + "\n"
                }
                count++;
            } else {
                return string;
            }
        }
        return string;
    }
    render() {
        return(
            <div className="cocktail-wrapper">
                {this.props.error && <p>{this.props.error}</p>}
                <div className="cocktail-wrapper-row tags">
                    <div className="cocktail-wrapper-column1 tags">
                        {this.props.alcoholic && <p>{this.props.alcoholic}</p>}
                    </div>
                    <div className="cocktail-wrapper-column1 tags">
                        {this.props.category && <p>{this.props.category}</p>}
                    </div>
                    <div className="cocktail-wrapper-column1 tags">
                        {this.props.glass && <p>{this.props.glass}</p>}
                    </div>
                </div>        
                <div className="cocktail-wrapper-row">
                    <div className="cocktail-wrapper-column1">
                        {this.props.nameOfDrink && <p className="title">{this.props.nameOfDrink}</p>}
                        {this.props.photo && <img className ="photo" src = {this.props.photo} border="5" align="left"/>}
                    </div>
                    <div className="cocktail-wrapper-column2">
                        {this.props.method && <p>Instructions <br></br><span>{this.getMethod(this.props.method)}</span></p>}
                    </div>
                    <div className="cocktail-wrapper-column2 ingredients">
                        {this.props.ingredients && <p>Ingredients <br></br><span>{this.getIngredients(this.props.ingredients)}</span></p>}
                    </div>
                </div>
                <div>      
                </div>
            </div>
        );
    }
}

export default Cocktail;