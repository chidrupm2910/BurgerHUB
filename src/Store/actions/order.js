import * as actionTypes from './actionTypes';
import axios from '../../axios-orders'

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderID: id,
        orderData: orderData
    }
    
}

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        error: error
    }
    
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}
export const purchaseBurger = (orderData, token) => {
    
    return dispatch => {
        dispatch(purchaseBurgerStart());
          axios.post('/orders.json?auth='+ token, orderData)
        .then(response => {
            console.log(response.data);
            dispatch(purchaseBurgerSuccess(response.data.name, orderData))
        })
        .catch(error => {
           dispatch(purchaseBurgerFail(error))
        });
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    };
};

export const fetchOrderSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDER_SUCCESS,
        orders: orders
    }
}

export const fetchOrderFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDER_FAIL,
        error: error
    }
}

export const fetchOrderStart = () => {
    return {
        type: actionTypes.FETCH_ORDER_START
        
    };
};

export const fetchOrders = (token) => {
    return dispatch => {
        dispatch(fetchOrderStart())
        axios.get('/orders.json?auth=' + token)
        .then( res => {
            const fetchedOrders = [];
            for (let key in res.data){
                fetchedOrders.push({...res.data[key],
                id: key})
            }
            return dispatch(fetchOrderSuccess(fetchedOrders))
        })
        .catch(err => {
            return dispatch(fetchOrderFail(err))
        })
    }
}