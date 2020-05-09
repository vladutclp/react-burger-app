import React from 'react';
import Button from '../UI/Button/Button.js';
import Logo from '../Logo/Logo.js';
import classes from './Menu.module.css';
const menu = (props) => {
  return (
    
    <div className={classes.Hamburger} onClick={props.clicked}>
      <div></div>
      <div></div>
      <div></div>
    </div>
     
  );
}

export default menu;