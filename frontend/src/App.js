import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import { Redirect } from 'react-router';
import './App.css';
import 'filepond/dist/filepond.min.css';
import PaperTigerHeader from './PaperTigerHeader.js';
import ResultsPage from './resultsPage.jsx';
import Results from './results.jsx';
import Home from './home.jsx';
import LoginPage from './LoginPage.jsx';
import ProjectPage from './projectPage.jsx';
import AboutPage from './AboutPage.jsx';
import history from "./history";
import RedirecPage from "./redirectPage.jsx";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: 'av',
      userName: "Offline"
    }
  }

  authenticateUser = (userID, user) => {
    this.setState({authUser: userID, userName: user});
  }

  verifyUser = (userID) => {
    if ((this.state.authUser != userID) || (this.state.authUser == null)) {
      console.log("USER NOT SIGNED IN");
      history.push('/redirect');
      return;
    }
    console.log("USER SIGNED IN - OK TO PROCEED");

  }

  logOutUser = () => {
    this.setState({authUser: null, userName: ""});

    const data = JSON.stringify({
      userToken: this.state.authUser
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
      user: this.state.userName
    }

    const authPayloadSpecial = {
      authenticateUser: this.authenticateUser
    }

    return (
      <div className="App">
        {/* <header>
        <PaperTigerHeader />
        </header> */}
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
