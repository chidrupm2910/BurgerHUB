import React from 'react';
import burgerlogo from '../../assets/images/burger-logo.png'
import classes from './logo.css'
const logo = (props) => (
    <div className={classes.Logo} style ={{height:props.height}}>
    <img src = {burgerlogo} alt="BurgerHUB"/>
    </div>
    
    );
    
    export default logo;