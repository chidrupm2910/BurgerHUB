import React, { Component } from 'react';
import Layout from './hoc/Layout/layout';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/checkout';
import Orders from './containers/Orders/orders'
import Auth from './containers/Auth/auth'
import Logout from './containers/Auth/Logout/logout'
import * as actions from './Store/actions/index'

class App extends Component {
  
  componentDidMount() {
    this.props.onTryToAutoSignUp()
  }
  render () {
    let routes = (
      <Switch>
      <Route path="/auth" component = {Auth}/>
      <Route path="/" exact component = {BurgerBuilder}/>
      <Redirect to="/" />
      </Switch>
      )
      if(this.props.isAuthenticated) {
        routes =  <Switch>
      <Route path="/checkout" component = {Checkout}/>
      <Route path="/orders" component = {Orders}/>
      <Route path="/auth" component = {Auth}/>
      <Route path="/logout" component={Logout} />
      <Route path="/" exact component = {BurgerBuilder}/>
      <Redirect to="/" />
      </Switch>
      }
    
    return (
      <div >
      <Layout>
      {routes}
      
      </Layout>
      </div>
    );
  }
}

const mapStatetoProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryToAutoSignUp :() => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps) (App));
