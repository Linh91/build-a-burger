import React, {Component} from 'react';

import Aux from '../Aux/Aux';
import classes from './Layout.css'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    SideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }

    SideDrawerToggleHandler = () => {
        this.setState((preState) => {
            return{ showSideDrawer: !preState.showSideDrawer}
        });
    }

    render () {
        return (
            <Aux>
                <Toolbar drawerToggleClicked={this.SideDrawerToggleHandler}/>
                <SideDrawer
                    closed={this.SideDrawerClosedHandler}
                    open={this.state.showSideDrawer}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout;

