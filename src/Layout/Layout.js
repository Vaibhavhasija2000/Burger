import React,{ Component } from 'react';

import Auxiliary from '../hoc/Auxiliary';
import classes from './Layout.css';

import Toolbar from '../components/Naivgation/Toolbar/Toolbar';
import SideDrawer from '../components/Naivgation/SideDrawer/SideDrawer';


class Layout extends Component{
    state = {
        showSideDrawer: false
    }
    sideDrawerClosedHandler = () => {
        this.setState((prevState) => { 
            return {showSideDrawer:!prevState.showSideDrawer};
        });

    }
    sideDrawerToggleHandler =() => {
        this.setState({showSideDrawer:true});

    }
    render() {
        return(
    <Auxiliary>
        <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
        <SideDrawer  closed = {this.sideDrawerClosedHandler}
                      open={this.state.showSideDrawer}/>
    <main className={classes.Content}>
        {this.props.children}
    </main>
    </Auxiliary>
        )
    }
    
}

export default Layout;