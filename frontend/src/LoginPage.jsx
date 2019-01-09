import React, { Component } from 'react';
import { ModalBody} from 'reactstrap';
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
          <React.Fragment>

<div class="jumbotron jumbotron-fluid text-center">
<div className="toplevel">
            <Modal.Dialog>
            <Modal.Body>
            <div className="App-body">  
            <img src={paperTigerlogofinal} height="227.2" width="320"/>

            </div>
            {/* <img src="https://image.flaticon.com/icons/svg/1254/1254986.svg" class="jumbo-img"/> */}

            <div id="google-button">
            <GoogleLogin
              clientId="218437734175-0vhiaomko61rgce732icedd8ehfug697.apps.googleusercontent.com"
              buttonText="Login"
              theme="dark"
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
            />
            </div>
            </Modal.Body>
            </Modal.Dialog>
            </div>
</div>


  
<div class="container-fluid bg-3 text-center">    
  <h3 class="margin"></h3><br></br>
  <div class="row">
    <div class="col-sm-4">
            <img src="https://image.flaticon.com/icons/svg/1122/1122567.svg" class="img-responsive margin"/>
      <p>Allow machine learning to optimize your search results. </p>
    </div>
    <div class="col-sm-4"> 
      <img src="https://image.flaticon.com/icons/svg/1114/1114544.svg" class="img-responsive margin" />
      <p>Spend less time on irrelevant resources</p>
    </div>
    <div class="col-sm-4"> 
            <img  src="https://image.flaticon.com/icons/svg/1118/1118324.svg" class="img-responsive margin"/>
      <p>Find papers that will provide you with the most insightful ideas. </p>
    </div>
  </div>
</div>
 
{/* 
<div class="container-fluid bg-3 text-center">
 <div class="row">
  <div class="col-sm-4">
    <img src="https://image.flaticon.com/icons/svg/1122/1122567.svg" class="img-responsive margin"/>
  </div>
  <div class="col-sm-8">
    <p>Allow our algorithms to</p>
  </div>
 </div>
</div>
 
  */}

{/* <img src = "https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80"/> */}

          </React.Fragment>
        );
      }
}

export default withRouter(LoginPage);