import * as actionTypes from '../actions/actionTypes'
import {updateObject} from '../../shared/utility'

const initialState = {
    ingredients: null,
        totalPrice: 4,
        loading: false,
        error: false,
        building: false
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.5,
    bacon:1.0
}

const addIngredient = (state, action) => {
    const updatedIngredient= {[action.ingredientName] : state.ingredients[action.ingredientName] + 1}
            const updatedIngredients = updateObject(state.ingredients , updatedIngredient)
            const updatedState = {
                ingredients: updatedIngredients,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
                building: true
            }
            return updateObject(state , updatedState)
}

const rmvIngredient =(state, action) => {
    const updatedIng= {[action.ingredientName] : state.ingredients[action.ingredientName] - 1}
            const updatedIngs = updateObject(state.ingredients , updatedIng)
            const updatedSt = {
                ingredients: updatedIngs,
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
                building: true
            }
            return updateObject(state , updatedSt)
}

const setIngredient = (state, action) => {
     return updateObject(state, {
                ingredients: {
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat
                    
                },
                error: false,
                totalPrice: 4,
                building: false
            })
}
const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_Ingredient: return addIngredient(state, action)
            
        case actionTypes.RMV_Ingredient: return rmvIngredient(state, action)
            
        
        case actionTypes.SET_Ingredient: return setIngredient(state, action)
           
          
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return updateObject(state, {error: true})
            
        
        default:
        return state;
    }
    
}

export default reducer;