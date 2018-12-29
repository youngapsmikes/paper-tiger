import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import './Home.css';
import { GoogleLogin } from 'react-google-login';
import {withRouter} from 'react-router-dom';
import { Redirect } from 'react-router';
import paperTigerlogofinal from './paperTigerlogofinal.png'


class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.responseGoogle = this.responseGoogle.bind(this);
  }
  responseGoogle(googleUser) {
    var profile = googleUser.getBasicProfile();
          console.log("ID: " + profile.getId()); // Don't send this directly to your server!
          console.log('Full Name: ' + profile.getName());
          console.log('Given Name: ' + profile.getGivenName());
          console.log('Family Name: ' + profile.getFamilyName());
          console.log("Image URL: " + profile.getImageUrl());
          console.log("Email: " + profile.getEmail());
          // The ID token you need to pass to your backend:
          var id_token = googleUser.getAuthResponse().id_token;
          // Sending the token to the backend
          console.log("ID Token: " + id_token);
          var xhr = new XMLHttpRequest();
          xhr.open('POST', '/account/login/');
          xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
          xhr.onload = function() {
            console.log('Signed in as: ' + xhr.responseText);
          };
          xhr.send('idtoken=' + id_token);
          console.log(this);
          var email = profile.getEmail();
          var user = email.substring(0, email.lastIndexOf("@"));

          const data = JSON.stringify({
            userName: user
          });

          fetch('http://localhost:5000/backend/getusertoken', {
            method: 'POST',
            body: data,
          }).then(resp => resp.json()).then(data => {
            console.log(data);
            this.props.authPayloadSpecial.authenticateUser(data[0].token, profile.getGivenName());
            this.setState({redirect: true, userID: data[0].token});
          }).catch((error) => console.log(error));
    const DEBUG = false;

    if (DEBUG) {
      this.props.authPayloadSpecial.authenticateUser(12345, "Quinn");
      this.setState({redirect: true, userID: 12345});
    }
  }
      state = {
      redirect: false,
      userID: ''
    }

    render() {
      const { redirect } = this.state;
      if (redirect) {
        const newTo = {
          pathname: "/projects/" + this.state.userID
        }
        return <Redirect to={newTo}/>;
      }
        return (
          <div className="toplevel">
            <Modal.Dialog>
            <Modal.Body>
            <div className="App-body">  
            <img src={paperTigerlogofinal} height="227.2" width="320"/>

            </div>
            <GoogleLogin
              clientId="218437734175-0vhiaomko61rgce732icedd8ehfug697.apps.googleusercontent.com"
              buttonText="Login"
              theme="dark"
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
            />
    
            </Modal.Body>
            </Modal.Dialog>
            </div>
        );
      }
}

export default withRouter(LoginPage);
