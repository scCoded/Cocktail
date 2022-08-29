import React from "react";
class Random extends React.Component{
    render(){
        return(
        <button Random onClick={this.props.getRandom}>Random Cocktail!</button>
        );
    }
}

export default Random;