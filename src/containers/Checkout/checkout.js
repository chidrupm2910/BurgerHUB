import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/checkoutSummary';
import * as actions from '../../Store/actions/index'
import ContactData from './ContactData/contactData'
class Checkout extends Component {
  
    
     /*componentWillMount () {
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
    }*/
     checkoutCancelledHandler = () => {
       this.props.history.goBack();
       
    
    }   
    
    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    
    render() {
        let summary = <Redirect to='/' />;
        
        if(this.props.ings){
            const purchasedRedirect = this.props.purchased ? <Redirect to = '/'/>: null ;
         summary =  ( <div>
         {purchasedRedirect}
         <CheckoutSummary ingredients={this.props.ings}
        onCheckoutCancelled={this.checkoutCancelledHandler}
        onCheckoutContinued={this.checkoutContinueHandler} />
        <Route path={this.props.match.path + '/contact-data'} 
        component ={ContactData} />
        </div>)
        }
        return summary;
        
    }
    
    
}

const mapStatetoProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
        
    }
}



export default connect(mapStatetoProps)(Checkout);