import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl.js'
const controls = [
	{label: 'Salad', type: 'salad'},
	{label: 'Cheese', type: 'cheese'},
	{label: 'Bacon', type: 'bacon'},
	{label: 'Meat', type: 'meat'}
];

const buildControls = (props) => {
	return (
		<div className={classes.BuildControls} >
			<p>Current price: <strong>{props.price.toFixed(2)} $</strong></p>
			{controls.map(control => (
				<BuildControl 
				key={control.label} 
				label={control.label} 
				added={() => props.ingredientAdded(control.type)}
				deleted={() => props.ingredientDeleted(control.type)}
				disabled={props.disabled[control.type]}/>
			))}
			<button
			onClick={props.ordered} 
			className={classes.OrderButton}
			disabled={props.purchasable}>ORDER NOW</button>
		</div>
	);
}

export default buildControls;