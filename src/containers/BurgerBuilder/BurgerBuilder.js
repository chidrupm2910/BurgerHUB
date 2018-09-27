import React ,{Component} from 'react';
import {connect} from 'react-redux'
import Aux from '../../hoc/Aux/aux';
import Burger from '../../components/Burger/burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/modal';
import OrderSummary from '../../components/Burger/OrderSummary/orderSummary';
import axios from '../../axios-orders.js';
import Spinner from '../../components/UI/Spinner/spinner'
import withErrorHandler from '../../hoc/WithErrorHandler/withErrorHandler';
import * as actionTypes from '../../Store/action'



class BurgerBuilder extends Component {
    /*   constructor(props) {
        super(props);
        this.state = {...}
    }*/
    state = {
        
        purchaseable: false,
        purchasing: false,
        loading: false,
        error: false
    }
    componentDidMount () {
        console.log(this.props);
        /*axios.get('https://react-burgerhub.firebaseio.com/ingredients.json')
        .then(response => {
            this.setState({ingredients: response.data});
        })
        .catch(error => {
            this.setState({error: true})
        })*/
    }
    updatePurchaseState (ingredients) {
       
        const sum = Object.keys(ingredients)
        .map(igkey => {
            return ingredients[igkey];
        })
        .reduce((sum, el) => {
            return sum + el
        },0);
        return sum > 0;
    }
    
    /*addIngredientHandler=(type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount +1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type] ;
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        
        this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
        this.updatePurchaseState(updatedIngredients)
    }
    */
    
    /*removeIngredientHandler = (type) => {
       const oldCount = this.state.ingredients[type];
       if(oldCount <= 0){
           return;
       }
        const updatedCount = oldCount -1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type] ;
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        
        this.setState({ingredients: updatedIngredients, totalPrice: newPrice}); 
        
        this.updatePurchaseState(updatedIngredients);
    }*/
     purchaseHandler = () => {
        this.setState({purchasing: true});
    }
    
    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }
    
    purchaseContinueHandler = () => {
        
       /* const queryParams = [];
        for(let i in this.props.ings) {
            queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push("price=" + this.props.price);
        const queryString = queryParams.join('&')
        console.log(this.props);*/
        this.props.history.push('/checkout')
        /*{
            pathname:'/checkout',
            search: '?'+ queryString
            })*/
    }
    render () {
        const disableInfo = {
            ...this.props.ings
        };
        for(let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }
        
        
        let burger = this.state.error ? <p>Ingredients not loaded</p> :<Spinner />
        if(this.props.ings){
           burger = (
            <Aux>
            <Burger ingredients={this.props.ings} />
            <BuildControls 
            ingredientAdded = {this.props.onIngredientAdded}
            ingredientRemoved = {this.props.onIngredientRemoved}
            disabled = {disableInfo}
            price = {this.props.price}
            purchaseable= {this.updatePurchaseState(this.props.ings)}
            ordered= {this.purchaseHandler}
            />
            </Aux>
            ); 
        }
        let orderSummary = null;
        if(this.props.ings){
          orderSummary = <OrderSummary ingredients = {this.props.ings} 
            purchaseCanceled ={this.purchaseCancelHandler} 
            purchaseContinue={this.purchaseContinueHandler}
            price={this.props.price}/>  
        }
        if(this.state.loading){
            orderSummary = <Spinner />;
        }
        
         
        return(
            <Aux>
            <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
            {orderSummary}
            </Modal>
            {burger}
            </Aux>
            );
    }
}

const mapStatetoProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchtoProps = dispatch => {
    return {
        onIngredientAdded : (ingName) => dispatch({type: actionTypes.ADD_Ingredient, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.RMV_Ingredient, ingredientName: ingName})
    }
}
export default connect(mapStatetoProps, mapDispatchtoProps) (withErrorHandler(BurgerBuilder, axios));