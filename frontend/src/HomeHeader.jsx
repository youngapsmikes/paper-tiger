import React, { Component } from 'react';
import paperTigerlogofinal from './paperTigerlogofinal.png'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink, } from 'reactstrap';
import history from "./history";

export default class HomeHeader extends Component {
      render() {
        return (
          <div>
            <Navbar color="light" light expand="md">
                <NavbarBrand href="/" onClick={this.homePage}><img src={paperTigerlogofinal} height="45.44" width="64"/>
                </NavbarBrand>
              <NavbarBrand onClick={this.homePage} href="/">paper tiger</NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
            </Navbar>
          </div>
        );
      }
    }
