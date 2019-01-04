import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';
import history from "./history";
import "./redirectPage.css";

export default class RedirectPage extends Component {

    redirectToLogin = () => {
        history.push('/');
    }

    componentDidMount() {
        setTimeout(this.redirectToLogin, 1500);
    }

    render() {
        return (
        
            <div className="toplevel">
            <Jumbotron fluid>
                <h1>You are not logged in</h1>
                <p>Redirecting to login page. Please sign in to continue. </p>
            </Jumbotron>
            </div>
        );
        
    }
}