import React from 'react';
import Burger from '../../Burger/burger';
import Button from '../../UI/Button/button'
import classes from './checkoutSummary.css';
const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
        <h1>It Tastes Awesome</h1>
        <div style={{width: '100%', margin: 'auto'}}>
        <Burger ingredients={props.ingredients}/>
        </div>
        <Button 
        btnType="Danger"
        clicked={props.onCheckoutCancelled}
        >CANCEL</Button>
        <Button btnType="Success"
        clicked={props.onCheckoutContinued}>CONTINUE</Button>
        
        </div>
        
        )
    
    
}

export default checkoutSummary;