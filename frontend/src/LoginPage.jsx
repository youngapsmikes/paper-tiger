import React, { Component } from 'react';
import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button, Row, 
} from 'reactstrap';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Jumbotron} from 'reactstrap';
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
          this.setState({redirect: true, userID: user});
  
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
          <Container>
          <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <div>
              <ModalBody>
                <img src={paperTigerlogofinal} height="227.2" width="320"/>
                <Col sm="12" md={{ size: 6, offset: 3 }}>
                <ModalFooter>
                <GoogleLogin
                  clientId="218437734175-0vhiaomko61rgce732icedd8ehfug697.apps.googleusercontent.com"
                  buttonText="Login"
                  theme="dark"
                  onSuccess={this.responseGoogle}
                  onFailure={this.responseGoogle}
                />
                </ModalFooter>
                </Col>
              </ModalBody>
            </div>
          </Col>
          </Row>

          <Row>
            <Col>
              <Jumbotron fluid>
                <h1 className="display-1">Behind the Machine Learning</h1>
                <p className="lead">How does paper tiger return recommendations? We use a machine learning algorithm called Latent Dirichlet Allocation (LDA). LDA assumes that documents are generated in the following way. Each document has two corresponding weighted dice. One dice captures the probabilities of various topics. For news, these topics could be categories like politics, culture, or science. Every topic also has a corresponding word dice which captures the probabilities of different words under a given topic. For example, words like "fake news" might be more common under a "politics" topic than a "sports" topic. By assuming this process for generating documents, LDA can then learn topics from a set of documents in an unsupervised way. How does this inference procedure work? We'll have to be hand-wavy here. Basically, we start off with random assignments of words to topics. By examining the co-occurences of words throughout different documents as well the types of words which appear frequently within a particular document (local properties) we can discover the topics underlying a set of documents. </p>
              </Jumbotron>
            </Col>
          </Row>
          </Container>
        );
      }
}

export default withRouter(LoginPage);
