import React, {Component} from 'react';

import Aux from '../../hoc/Aux';
import classes from './Layout.css'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import Toolbar from '../Navigation/Toolbar/Toolbar';

class Layout extends Component {
    state = {
        showSideDrawer: true
    }

    SideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }
    render () {
        return (
            <Aux>
                <Toolbar />
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

