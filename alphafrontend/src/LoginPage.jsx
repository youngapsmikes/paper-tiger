import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import './home.css';
import { GoogleLogin } from 'react-google-login';
import {withRouter} from 'react-router-dom';


const responseGoogle = (googleUser) => {
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

        this.props.history.push('/home');


}

class LoginPage extends Component {
    render() {
        return (
          <div className="toplevel">
            <Modal.Dialog>
            <Modal.Body>
            <div className="App-body">  
            <h1 className="modalTitle">Paper Tiger</h1>
            </div>
            <GoogleLogin
              clientId="218437734175-0vhiaomko61rgce732icedd8ehfug697.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
            />
    
            </Modal.Body>
            </Modal.Dialog>
            </div>
        );
      }
}

export default withRouter(LoginPage);
