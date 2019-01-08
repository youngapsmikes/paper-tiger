import React, { Component } from 'react';
import paperTigerlogofinal from './paperTigerlogofinal.png'
import './paperTigerHeader.css'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink, } from 'reactstrap';

export default class PaperTigerHeader extends Component {
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
      render() {
        return (
          <div>
            <Navbar color="light" light expand="md">
                <NavbarBrand href="/"><img src={paperTigerlogofinal} height="45.44" width="64"/>
                </NavbarBrand>
              <NavbarBrand href="/">paper tiger</NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <NavLink href={"/about/" + this.props.userID}>About</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href={"/projects/" + this.props.userID}>{this.props.authPayload.user}</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href={"/"} onClick={this.logOut}>Logout</NavLink>
                  </NavItem>
                </Nav>
              </Collapse>
            </Navbar>
          </div>
        );
      }
    }