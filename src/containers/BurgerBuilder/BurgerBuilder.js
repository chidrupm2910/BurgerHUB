import React ,{Component} from 'react';
import Aux from '../../hoc/Aux/aux';
import Burger from '../../components/Burger/burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/modal';
import OrderSummary from '../../components/Burger/OrderSummary/orderSummary';
import axios from '../../axios-orders.js';
import Spinner from '../../components/UI/Spinner/spinner'
import withErrorHandler from '../../hoc/WithErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.5,
    bacon:1.0
}

class BurgerBuilder extends Component {
    /*   constructor(props) {
        super(props);
        this.state = {...}
    }*/
    state = {
        ingredients: null,
        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
        loading: false,
        error: false
    }
    componentDidMount () {
        console.log(this.props);
        axios.get('https://react-burgerhub.firebaseio.com/ingredients.json')
        .then(response => {
            this.setState({ingredients: response.data});
        })
        .catch(error => {
            this.setState({error: true})
        })
    }
    updatePurchaseState (ingredients) {
       
        const sum = Object.keys(ingredients)
        .map(igkey => {
            return ingredients[igkey];
        })
        .reduce((sum, el) => {
            return sum + el
        },0);
        this.setState({purchaseable: sum >0});
    }
    
    addIngredientHandler=(type) => {
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
    
    
    removeIngredientHandler = (type) => {
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
    }
     purchaseHandler = () => {
        this.setState({purchasing: true});
    }
    
    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }
    
    purchaseContinueHandler = () => {
        /*this.setState({loading: true})
        //alert("You Continued");
        const order ={
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Chid',
                address: {
                    street : 'Blk MTN RD',
                    zipcode: '92126',
                    country: "USA"
                },
                email : 'chid@gmail.com'
            },
            deliveryMethod: "fastest"
        };
        axios.post('/orders.json', order)
        .then(response => {
            this.setState({loading: false, purchasing: false})
        })
        .catch(error => {
            this.setState({loading: false, purchasing: false})
        });
        */
        const queryParams = [];
        for(let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i]))
        }
        const queryString = queryParams.join('&')
        console.log(this.props);
        this.props.history.push({
            pathname:'/checkout',
            search: '?'+ queryString
            })
    }
    render () {
        const disableInfo = {
            ...this.state.ingredients
        };
        for(let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }
        
        
        let burger = this.state.error ? <p>Ingredients not loaded</p> :<Spinner />
        if(this.state.ingredients){
           burger = (
            <Aux>
            <Burger ingredients={this.state.ingredients} />
            <BuildControls 
            ingredientAdded = {this.addIngredientHandler}
            ingredientRemoved = {this.removeIngredientHandler}
            disabled = {disableInfo}
            price = {this.state.totalPrice}
            purchaseable= {this.state.purchaseable}
            ordered= {this.purchaseHandler}
            />
            </Aux>
            ); 
        }
        let orderSummary = null;
        if(this.state.ingredients){
          orderSummary = <OrderSummary ingredients = {this.state.ingredients} 
            purchaseCanceled ={this.purchaseCancelHandler} 
            purchaseContinue={this.purchaseContinueHandler}
            price={this.state.totalPrice}/>  
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

export default withErrorHandler(BurgerBuilder, axios);