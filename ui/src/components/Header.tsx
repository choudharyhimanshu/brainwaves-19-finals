import React, { Component } from 'react';
import {Icon, Menu} from "semantic-ui-react";
import {Link} from "react-router-dom";

export interface IHeaderProps {
}

class Header extends Component {

    render(): React.ReactNode {
        return(
            <Menu inverted style={{borderRadius: 0}}>
                <Menu.Item><h4><Icon name='columns'/>Swift Matcher</h4></Menu.Item>
                <Link to='' className='item'>Home</Link>
                <Link to='/search' className='item'>Search</Link>
                <Menu.Menu position='right'>
                    <Menu.Item><Icon name='user outline' style={{marginRight: 10}}/>sudo@007.com</Menu.Item>
                </Menu.Menu>
            </Menu>
        );
    }
}

export default Header;
