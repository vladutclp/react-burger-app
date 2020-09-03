import React, {Component} from 'react';
import Aux 					 from '../../hoc/Aux';
import Burger 			 from '../../components/Burger/Burger.js';
import BuildControls from '../../components/Burger/BuildControls/BuildControls.js';
import Modal 				 from '../../components/UI/Modal/Modal.js';
import OrderSummary  from '../../components/Burger/OrderSummary/OrderSummary.js';
import axios 				 from '../../axios.js';
import Spinner 			 from '../../components/UI/Spinner/Spinner.js';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler.js';


const INGREDIENT_PRICE = {
	salad:  0.5,
	cheese: 0.4,
	meat:   1.3,
	bacon:  0.7
}

class BurgerBuilder extends Component{

	constructor(props){
		super(props);
		this.state = {
			ingredients: null,
			totalPrice:  4,
			purchasable: false,
			purchasing:  false,
			loading:     false
		}
	}

	componentDidMount() {
		console.log("Burger builder component did mount");
		console.log(this.props);
		const url = 'https://react-burger-app-1a894.firebaseio.com/ingredients.json';
		axios.get(url)
			.then(response =>{
				console.log(response.data);
				this.setState({ingredients: response.data})
			})
			.catch(error => {});
	}

	resetIngriedientsAndPrice = () => {
		const resetIngredients = {...this.state.ingredients};
		for(let key in resetIngredients)
			resetIngredients[key] = 0;
		this.setState({ingredients: resetIngredients, totalPrice: 0});

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

	purchaseHandler = () => {
		this.setState({purchasing: true})
	}

	purchaseCancelHandler = () => {
		this.setState({purchasing: false});
	}

	purchaseContinueHandler = () => {
		//alert('You continued!');
		// const order = {
		// 	ingredients: 		this.state.ingredients,
		// 	price: 			 		this.state.totalPrice.toFixed(2),
		// 	customer: {
		// 		name:      		'ClapsHydra',
		// 		adress: {
		// 			street:  		'Love street',
		// 			zipCode: 		'4200000',
		// 			country: 		'Gibonia'
		// 		},
		// 		email:     		'claps@gibonia.com'
		// 	},
		// 	deliveryMethod: 'fastest'
		// };

		// axios.post('/orders.json', order)
		//     .then(response =>{
		// 			this.resetIngriedientsAndPrice();
		// 			this.setState({loading: false, purchasing: false});
					
		// 		})
		// 		.catch(error => {
		// 			this.setState({loading: false, purchasing: false});
		// 		})
		this.props.history.push('/checkout');
	}

	render(){
		
		const disabledButton = {...this.state.ingredients};//create an object with booleans based on no of the ingredients object
		for(let key in disabledButton){
			disabledButton[key] = disabledButton[key] <= 0; //false if there are 0, true if there are more than 0 ingredients
		}
		let orderSummary = null;
		let burger = <Spinner />
		if(this.state.ingredients){
			burger = (
				<Aux>
					<Burger ingredients={this.state.ingredients}/>
					<BuildControls 
						ingredientAdded={this.addIngredientHandler} 
						ingredientDeleted={this.removeIngredientHandler}
						disabled={disabledButton}
						price={this.state.totalPrice}
						purchasable={!this.state.purchasable}
						ordered={this.purchaseHandler}
						/>
				</Aux>
			);
			orderSummary = <OrderSummary
											 price={this.state.totalPrice}
											 ingredients={this.state.ingredients} 
											 cancel={this.purchaseCancelHandler}
											 continue={this.purchaseContinueHandler}/>;

		}	
		if(this.state.loading)
			orderSummary = <Spinner />
		return(
			<Aux>
				<Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
					{orderSummary}
				</Modal>
				{burger}
			</Aux>
		);
	}

}


export default withErrorHandler(BurgerBuilder, axios); 