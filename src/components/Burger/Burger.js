import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient.js';
import classes from './Burger.module.css';

const burger = (props) => {

	let transformedIngredients = Object.keys(props.ingredients)
		.map(ingredientKey => {
		 
			return [...Array(props.ingredients[ingredientKey])].map((_, id) => {
				 //Create an array with [ingredientKey] elements
				return <BurgerIngredient key={ingredientKey + id} type={ingredientKey} /> // and mapt it to a burgerIngredient component
			});
		})
		.reduce((arr, el) => {
			
			return arr.concat(el); //flatten the array of arrays to just an array
		}, []);
		if(transformedIngredients.length === 0){
			transformedIngredients = <p>Please add some ingredients</p>;
		}
	return(
	  <div className={classes.Burger}>
	  	<BurgerIngredient type="bread-top" />
	  	{transformedIngredients}
	  	<BurgerIngredient type="bread-bottom" />
	  </div>	
	);

}

export default burger;