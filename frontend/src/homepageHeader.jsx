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
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false
        };
      }
      toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }
      logOut = (event) => {
        event.preventDefault();
        this.props.authPayload.logOutUser();
      }
      homePage = (event) => {
        event.preventDefault();
        this.props.authPayload.verifyUser();

        const path = "/projects/" + this.props.userID;

        history.push(path);
      }

      render() {
        return (
          <div>
            <Navbar color="light" light expand="md">
                <NavbarBrand href="/" onClick={this.homePage}><img src={paperTigerlogofinal} height="45.44" width="64"/>
                </NavbarBrand>
              <NavbarBrand onClick={this.homePage} href="/">paper tiger</NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                <NavItem>
                    <NavLink href={"/abt/" + this.props.userID}>About</NavLink>
                  </NavItem>

                <NavItem>
                    <NavLink href={"/"}>Login</NavLink>
                </NavItem>

                </Nav>
              </Collapse>
            </Navbar>
          </div>
        );
      }
    }