import React,{Component} from 'react';
import Aux from '../Aux/aux';
import classes from './layout.css';
import Toolbar from '../../components/Navigation/Toolbar/toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

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