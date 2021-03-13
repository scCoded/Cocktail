import React from "react";

class Cocktail extends React.Component{
    render(){
        return(
            <div>
                {this.props.nameOfDrink && <p> Name: {this.props.nameOfDrink} </p>}
                {this.props.method && <p> Method: {this.props.method} </p>}
                {this.props.photo && <img src = {this.props.photo} border="5" width="500" height="400" align="left"/>}
                {this.props.error && <p> Error: {this.props.error} </p>}
            </div>
        );
    }
}

export default Cocktail;