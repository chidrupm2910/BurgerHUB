import React from 'react';
import classes from './order.css'
const order = (props) => {
    const ingredients =[];
    for(let ingredient in props.ingredients){
        ingredients.push({name:  ingredient, 
        amount: props.ingredients[ingredient]})
    }
    const ingredientOutput = ingredients.map(ig => {
        return <span style={{
            textTransform: 'capitalize',
            display: 'inline-block',
            border: '1px solid #ccc'
        }}key={ig.name}>{ig.name} {ig.amount} </span>
    })
 return(
    <div className={classes.Order}> 
    <p> Ingredients :{ingredientOutput}  </p>
    <p> Price : {props.price} $ </p>
    </div>
)
    
}

export default order;