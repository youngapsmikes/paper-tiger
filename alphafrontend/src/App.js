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


const MainMenu = () => {
  return (
    <div>
    <Link to="/">
    <button>Login</button>
    </Link>
    <Link to="/home">
    <button>Home</button>
    </Link>
    <Link to="/results/000">
    <button>
      Results page 
    </button>
    </Link>
    <Link to="/projects">
    <button>
      Projects page 
    </button>
    </Link>
  </div>
  );
};

class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
        <header>
        <PaperTigerHeader />
        <MainMenu/>
        </header>
        <Switch>
          <Route path="/results/:id" component={ResultsPage} />
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/projects" component={ProjectPage} />
        </Switch>
        
      </div>
      </Router>
    );
  }
}

export default App;
