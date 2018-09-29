import React,{Component} from 'react';
import Aux from '../Aux/aux';
import classes from './layout.css';
import Toolbar from '../../components/Navigation/Toolbar/toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';

class Layout extends Component{
  state ={
    showSidedrawer: false
  }
  sideDrawerClosedHandler = () => {
    this.setState({showSidedrawer: false});
    
  }
  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return ({showSidedrawer: !prevState.showSidedrawer})
    })
    }
  
  render() {
    return (
      <Aux>
      <Toolbar isAuth={this.props.isAuthenticated}drawerToggleclicked={this.sideDrawerToggleHandler}/>
      <SideDrawer 
      isAuth={this.props.isAuthenticated}
      open = {this.state.showSidedrawer}
      closed={this.sideDrawerClosedHandler}/>
      <main className = {classes.Content}>
      {this.props.children}
      </main>
    </Aux>
      
      )
  }
}

const mapStatetoProps = state => {
  return {
    isAuthenticated: state.auth.token != null
  }
}

export default connect(mapStatetoProps)(Layout);