import React, { Component } from 'react';
import Layout from './hoc/Layout/layout';
import {Route, Switch} from 'react-router-dom';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/checkout';
import Orders from './containers/Orders/orders'
import Auth from './containers/Auth/auth'

class App extends Component {
  render () {
    return (
      <div >
      <Layout>
      <Switch>
      <Route path="/checkout" component = {Checkout}/>
      <Route path="/orders" component = {Orders}/>
      <Route path="/auth" component = {Auth}/>
      <Route path="/" exact component = {BurgerBuilder}/>
      </Switch>
      
      </Layout>
      </div>
    );
  }
}

export default App;
