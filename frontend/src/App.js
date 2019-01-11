import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import 'filepond/dist/filepond.min.css';
import ResultsPage from './resultsPage.jsx';
import LoginPage from './LoginPage.jsx';
import ProjectPage from './projectPage.jsx';
import AboutPage from './AboutPage.jsx';
import history from "./history";
import RedirecPage from "./redirectPage.jsx";

class App extends Component {

  authenticateUser = (userID, user) => {
    window.sessionStorage.setItem("authUser", userID);
    window.sessionStorage.setItem("userName", user);
  }

  getAuthUser = () => {
    try {
      var user = window.sessionStorage.getItem("authUser");

      if (!user) {
        return null;
      } else {
        return user;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
    
  }

  getUserName = () => {
    try {
      var userName = window.sessionStorage.getItem("userName");
      if (!userName) {
        return 'Projects';
      } else {
        return userName;
      }
    } catch (error) {
      console.log(error);
      return 'Projects';
    }
  }

  verifyUser = (userID) => {
    var authUser = this.getAuthUser();
    if ((authUser !== userID) || (authUser == null)) {
      console.log("USER NOT SIGNED IN");
      console.log("USERID GIVEN IS : " + userID);
      console.log("UserID should be: " + authUser);
      history.push('/redirect');
      return;
    }
    console.log("USER SIGNED IN - OK TO PROCEED");

  }

  logOutUser = () => {
    var authUser = this.getAuthUser();
    window.sessionStorage.removeItem("authUser");
    window.sessionStorage.removeItem("userName");

    const data = JSON.stringify({
      userToken: authUser
    });

    fetch('http://localhost:5000/backend/signoutuser', {
      method: 'POST',
      body: data,
    }).catch((error) => console.log(error));

    console.log("USER LOGGED OUT");
    history.push('/');
  }

  render() {

    const authPayload = {
      verifyUser: this.verifyUser,
      logOutUser: this.logOutUser,
      user: this.getUserName()
    }

    const authPayloadSpecial = {
      authenticateUser: this.authenticateUser
    }

    return (
      <div className="App">
        <Switch>
          <Route path ="/about/:userID" render={(props) => <AboutPage {...props} authPayload={authPayload} />} />
          <Route path="/results/:userID/:projectID" render={(props) =><ResultsPage {...props} authPayload={authPayload} />} />
          <Route exact path="/" render={(props) =><LoginPage {...props} authPayloadSpecial = {authPayloadSpecial} />} />
          <Route path="/projects/:userID" render={(props) =><ProjectPage {...props} authPayload={authPayload}/>} />
          <Route path="/redirect" render={(props) =><RedirecPage {...props} authPayload={authPayload}/>} />
        </Switch>
        
      </div>
    );
  }
}

export default App;
