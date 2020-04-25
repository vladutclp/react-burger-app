import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger.js';
import BuildControls from '../../components/Burger/BuildControls/BuildControls.js';

const INGREDIENT_PRICE = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7
}

class BurgerBuilder extends Component{

	constructor(props){
		super(props);
		this.state = {
			ingredients: {
				bacon: 0,
				salad: 0,
				cheese: 0,
				meat: 0
			},
			totalPrice: 4,
			purchasable: false
		}
	}

	updatePurchaseState = (ingredients) => {
		const sum = Object.keys(ingredients).map(key =>{
			return ingredients[key]
		}).reduce((acc, el) => {
				return acc + el;
			}, 0);
		this.setState({purchasable: sum > 0});
	}


	addIngredientHandler = (type) => {
		const newIngredient = {...this.state.ingredients}
		newIngredient[type]++;
		const newPrice = this.state.totalPrice + INGREDIENT_PRICE[type];

		this.setState({ingredients: newIngredient, totalPrice: newPrice});
	
		this.updatePurchaseState(newIngredient);
	}

	removeIngredientHandler = (type) => {
		const newIngredient = {...this.state.ingredients};
		let newPrice = this.state.totalPrice;
		if(newIngredient[type] > 0){
			newIngredient[type]--;
			newPrice -= INGREDIENT_PRICE[type];
		}
		else return;
		this.setState({ingredients: newIngredient, totalPrice: newPrice});
		this.updatePurchaseState(newIngredient);
	}

	render(){
		
		const disabledButton = {...this.state.ingredients};//create an object with booleans based on the ingredients object
		for(let key in disabledButton){
			disabledButton[key] = disabledButton[key] <= 0; //false if there are 0, true if there are more than 0 ingredients
		}

		return(
			<Aux>
				<Burger ingredients={this.state.ingredients}/>
				<BuildControls 
					ingredientAdded={this.addIngredientHandler} 
					ingredientDeleted={this.removeIngredientHandler}
					disabled={disabledButton}
					price={this.state.totalPrice}
					purchasable={!this.state.purchasable}
					/>
			</Aux>
		);
	}

}


export default BurgerBuilder; 