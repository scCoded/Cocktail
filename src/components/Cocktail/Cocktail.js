import React from "react";
class Cocktail extends React.Component{
    getMethod(str){
        str = str.replace(/(\S\.|[!])\s*([A-Z])/g, "$1\n$2");
        return str;
    }
    render(){
        return(
            <div class="cocktail-wrapper">
                <div class="cocktail-wrapper-row">
                    <div class="cocktail-wrapper-column1">
                        {this.props.nameOfDrink && <p class="title">{this.props.nameOfDrink}</p>}
                        {this.props.photo && <img class ="photo" src = {this.props.photo} border="5" align="left"/>}
                    </div>
                    <div class="cocktail-wrapper-column2">
                        {this.props.method && <p> Instructions <br></br><span>{this.getMethod(this.props.method)}</span></p>}
                    </div>
                </div>
                <div>
                    {this.props.error && <p class="error"> {this.props.error} </p>}
                </div>
                
            </div>
        );
    }
}

export default Cocktail;