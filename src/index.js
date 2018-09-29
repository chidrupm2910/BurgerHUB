import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import orderReducer from './Store/reducer/order'
import thunk from 'redux-thunk'
import burgerBuilderReducer from './Store/reducer/burgerBuilder';
import authReducer from './Store/reducer/auth';

const composeEnhancers = process.env.NODE_ENV === 'development' ?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : null;

const rootReducer = combineReducers({
  burgerBuilder: burgerBuilderReducer,
  order: orderReducer,
  auth: authReducer
})

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
)) ;


const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </Provider>
    )

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
