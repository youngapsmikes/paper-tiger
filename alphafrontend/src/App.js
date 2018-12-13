import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import './App.css';
import 'filepond/dist/filepond.min.css';
import PaperTigerHeader from './PaperTigerHeader.js';
import ResultsPage from './resultsPage.jsx';
import Results from './results.jsx';
import Home from './home.jsx';
import LoginPage from './LoginPage.jsx';
import ProjectPage from './projectPage.jsx';
import AboutPage from './AboutPage.jsx';

class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
        <header>
        <PaperTigerHeader />
        </header>
        <Switch>
          <Route path ="/about" component={AboutPage} />
          <Route path="/results/:userID/:projectID" component={ResultsPage} />
          <Route exact path="/" component={LoginPage} />
          <Route path="/projects/:userID" component={ProjectPage} />
        </Switch>
        
      </div>
      </Router>
    );
  }
}

export default App;
