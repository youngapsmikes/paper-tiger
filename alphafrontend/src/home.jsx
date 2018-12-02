import React, { Component } from 'react';
import FileUpload from './FileUpload.jsx';
import 'filepond/dist/filepond.min.css';
import { Modal } from 'react-bootstrap';
import './home.css';
import { GoogleLogin } from 'react-google-login';

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
        console.log("ID Token: " + id_token);

}

export default class Home extends Component {
    render() {
        return (
          <div className="toplevel">
            <div className="static-modal">
            <Modal.Dialog>
            <Modal.Body>
            <div className="App-body">  
            <h1 className="modalTitle">File Submission</h1>
            </div>
            <div className = "fileupload">
            <FileUpload />
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
          </div>
        );
      }
}