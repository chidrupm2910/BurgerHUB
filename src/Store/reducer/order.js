import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility'

const initialState = {
    orders: [],
    loading: false,
    purchased: false
    
}


const orderReducer = (state=initialState, action) => {
    
    switch (action.type) {
        case actionTypes.PURCHASE_INIT:
            return updateObject(state, {purchased: false})
            
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            {
                const newOrder = updateObject(action.orderData, {id: action.orderID})
                return updateObject(state, {
                    order: state.orders.concat(newOrder),
                    loading: false,
                    purchased: true
                })
                
            }
            
        case actionTypes.PURCHASE_BURGER_FAIL:
            {
                return{
                    ...state,
                    loading: false
                }
            }
        
        case actionTypes.PURCHASE_BURGER_START:
            return updateObject(state, {loading: true})
            
        case actionTypes.FETCH_ORDER_START: 
            return updateObject(state, {loading: true})
           
         case actionTypes.FETCH_ORDER_SUCCESS: 
            {
                return updateObject(state, {
                    orders: action.orders,
                    loading: false
                }
                )
                
            }
            
         case actionTypes.FETCH_ORDER_FAIL: 
            {
                return {
                    ...state,
                    loading: false
                }
            }
        
        default:
            return state;
    }
    
    
}

export default orderReducer;