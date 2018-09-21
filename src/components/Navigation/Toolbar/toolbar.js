import React from 'react';
import classes from './toolbar.css';
import Logo from '../../Logo/logo'
import NavigationItems from '../navigationItems/navigationItems'
import DrawerToggle from '../SideDrawer/DrawerToggle/drawerToggle'

const toolbar = (props) => (
    <header className={classes.Toolbar}>
    <DrawerToggle clicked ={props.drawerToggleclicked}/>
    <div className={classes.Logo}>
    <Logo/>
    </div>
    <nav className ={classes.DesktopOnly}>
      <NavigationItems />
    </nav>
    </header>
    
)

export default toolbar;