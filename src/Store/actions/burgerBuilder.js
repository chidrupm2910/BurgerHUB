import * as actionTypes from './actionTypes';
import axios from '../../axios-orders.js';

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_Ingredient,
        ingredientName: name
    }
    
}

export const rmvIngredient = (name) => {
    return {
        type: actionTypes.RMV_Ingredient,
        ingredientName: name
    }
    
}

export const setIngredient = (ingredientName) => {
    return {
        type: actionTypes.SET_Ingredient,
        ingredients: ingredientName
    }
}

export const fetchIngredientFail = ()  => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get('https://react-burgerhub.firebaseio.com/ingredients.json')
        .then(response => {
            dispatch(setIngredient(response.data))
        })
        .catch(error => {
            dispatch(fetchIngredientFail())
        })
    }

}