import React from 'react';
import classes from './burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
const burger = (props) => { 
    //converting an object into array, MAP function cannot be used on objects
     let transformedIngredients = Object.keys(props.ingredients)
    .map(igkey => {
        //Array() method is a javascript method, used to create array
        return [...Array(props.ingredients[igkey])].map((_,i) => {
            return <BurgerIngredient key={igkey+i} type={igkey} />
        });
    } )
    .reduce((arr, el) => {
        return arr.concat(el)
    },[]);
    //reduce is a built in array function which helps us to transform an array into something else
    
    if(transformedIngredients.length === 0){
        transformedIngredients = <p> Please Start adding elements</p>;
    }
    
    
    return(
        <div className={classes.Burger}>
        <BurgerIngredient  type = "bread-top"/>
        {transformedIngredients}
        <BurgerIngredient  type = "bread-bottom"/>
        </div>
        );
    
}

export default burger;