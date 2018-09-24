import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/checkoutSummary';
import ContactData from './ContactData/contactData'
class Checkout extends Component {
    state = {
        ingredients : null,
        totalPrice: 0
        
    }
    
     componentWillMount () {
         let price = 0;
         console.log(this.props);
      const query = new URLSearchParams(this.props.location.search) ;
      const ingredients = {};
      for(let param of query.entries()){
          if(param[0] === 'price'){
            price = param[1];  
          }
          else{
            ingredients[param[0]] = +param[1]
  
          }
      }
      this.setState({ingredients: ingredients, totalPrice: price});
    }
     checkoutCancelledHandler = () => {
       this.props.history.goBack();
       
    
    }   
    
    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    
    render() {
        return (
        <div>
        <CheckoutSummary ingredients={this.state.ingredients}
        onCheckoutCancelled={this.checkoutCancelledHandler}
        onCheckoutContinued={this.checkoutContinueHandler} />
        <Route path={this.props.match.path + '/contact-data'} render={(props) => (<ContactData ingredients= {this.state.ingredients} totalPrice={this.state.totalPrice} {...props}/>)}/>
        </div>
        )
    }
    
    
}

export default Checkout;