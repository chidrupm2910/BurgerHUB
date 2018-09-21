import React,{Component} from 'react';
import Aux from '../../hoc/aux';
import classes from './layout.css';
import Toolbar from '../Navigation/Toolbar/toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component{
  state ={
    showSidedrawer: true
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
      <Toolbar drawerToggleclicked={this.sideDrawerToggleHandler}/>
      <SideDrawer 
      open = {this.state.showSidedrawer}
      closed={this.sideDrawerClosedHandler}/>
      <main className = {classes.Content}>
      {this.props.children}
      </main>
    </Aux>
      
      )
  }
} 

export default Layout;