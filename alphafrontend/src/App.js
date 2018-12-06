import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import './App.css';
import 'filepond/dist/filepond.min.css';
import PaperTigerHeader from './PaperTigerHeader.js';
import Results from './results.jsx';
import Home from './home.jsx';


const MainMenu = () => {
  return (
    <div>
    <Link to="/">
    <button>Home</button>
    </Link>
    <Link to="/results">
    <button>
      Results page 
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
          <Route exact path="/" component={Home} />
          <Route exact path="/results" component={Results} />
        </Switch>
        
      </div>
      </Router>
    );
  }
}

export default App;
