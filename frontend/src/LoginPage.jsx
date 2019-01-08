import React, { Component } from 'react';
import {Jumbotron, Container} from 'reactstrap';
import { Row, Col } from 'reactstrap';
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
<<<<<<< HEAD
          <div>
            <Container fluid>
              <Jumbotron>
                <Container fluid className="toplevel">
=======
          <React.Fragment>
<<<<<<< HEAD
<nav class="navbar navbar-expand-sm bg-dark navbar-dark sticky-top">
  <a class="navbar-brand" href="#">
    <img className="nav-image" src="https://image.flaticon.com/icons/svg/1254/1254986.svg"/>
  </a>
  
  <ul class="navbar-nav">
    <li class="nav-item">
      <a class="nav-link" href="#">Services</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#">How it Works</a>
    </li>
  </ul>
</nav>


<div class="container-fluid bg-3 text-center">    
  <div class="row">
  <div class="col-md-12">
  <div class="jumbotron jumbotron-fluid text-center">
      <h1>Paper Tiger</h1>
      <button type="button" class="btn btn-primary">Login</button>
  </div>
  </div>
  </div>
</div>

  
<div class="container-fluid bg-3 text-center">    
  <h3 class="margin">Services</h3><br></br>
  <div class="row">
    <div class="col-sm-4">
            <img src="https://image.flaticon.com/icons/svg/1122/1122567.svg" class="img-responsive margin"/>
      <p>Allow our algorithms to...</p>
    </div>
    <div class="col-sm-4"> 
      <img src="https://image.flaticon.com/icons/svg/1114/1114544.svg" class="img-responsive margin" />
      <p>Spend less time scouring research journals...</p>
    </div>
    <div class="col-sm-4"> 
            <img  src="https://image.flaticon.com/icons/svg/1118/1118324.svg" class="img-responsive margin"/>
      <p>Get the most relevant...</p>
    </div>
  </div>
</div>
=======
            <div class="container">
              <div class="row">
              <div class="jumbotron jumbotron-fluid">
>>>>>>> 48eff38f5dbc0087ff54f91e4dd34c1330a3c28e
                <img src={paperTigerlogofinal} height="227.2" width="320"/>
                <GoogleLogin
                  clientId="218437734175-0vhiaomko61rgce732icedd8ehfug697.apps.googleusercontent.com"
                  buttonText="Login"
                  theme="dark"
                  onSuccess={this.responseGoogle}
                  onFailure={this.responseGoogle}
                />
              </div>
            </div>
            </div>
>>>>>>> 53f476db6c10e5bdc0a11440dbe1683eff6d665d

          </React.Fragment>
        );
      }
}

export default withRouter(LoginPage);