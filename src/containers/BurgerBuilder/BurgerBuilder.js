import React ,{Component} from 'react';
import Aux from '../../hoc/aux';
import Burger from '../../components/Burger/burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/modal';
import OrderSummary from '../../components/Burger/OrderSummary/orderSummary';
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
        ingredients: {
            salad:0,
            bacon:0,
            cheese:0,
            meat:0
        },
        totalPrice: 4,
        purchaseable: false,
        purchasing: false
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
    render () {
        const disableInfo = {
            ...this.state.ingredients
        };
        for(let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }
        return(
            <Aux>
            <Modal show={this.state.purchasing}>
            <OrderSummary ingredients = {this.state.ingredients}/>
            </Modal>
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
}

export default BurgerBuilder