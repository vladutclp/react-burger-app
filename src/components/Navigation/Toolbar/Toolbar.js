import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo.js';
import NavigationItems from '../NavigationItems/NavigationItems.js';
import Menu from '../../Menu/Menu.js';
const toolbar = (props) => (
	<div className={classes.Toolbar}>
		{/* {<div onClick={props.toggleSideDrawer}>MENU</div>} */}
		<Menu clicked={props.toggleSideDrawer}/>
		<div className={classes.Logo}>
			<Logo />
		</div>
		<nav className={classes.DesktopOnly}>
			<NavigationItems />
		</nav>
	</div>
);

export default toolbar;