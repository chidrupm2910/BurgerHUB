import * as actionTypes from './actionTypes'
import axios from 'axios';

export const authStart = () => {
    
    return {
        type: actionTypes.AUTH_START
    };
    
};

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const authTimeCheck = (expTime) => {
    return dispatch => {
        setTimeout(() => {dispatch(logout());
            
        },expTime*1000)
    }
        
        
    
}

export const authSuccess = (token, userId) => {
    
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
    
};
export const authFail = (error) => {
    
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
    
};

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyA-Zpo0jjJckgDIxMV5lSotw2r17dLsUYE'
        if(!isSignUp){
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyA-Zpo0jjJckgDIxMV5lSotw2r17dLsUYE'
        }
        axios.post(url,authData)
        .then(response => {
            console.log(response)
            dispatch(authSuccess(response.data.idToken, response.data.localId))
            dispatch(authTimeCheck(response.data.expiresIn))
        })
        .catch(err => {
            console.log(err);
            dispatch(authFail(err.response.data.error.message))
        })
        
        
        
    };
};

export const authRedirectPath = (path) => {
            return {
                type: actionTypes.SET_AUTH_REDIRECT_PATH,
                path: path
                
            }
        }