import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import PaperForm from './PaperForm.jsx';
import FileUpload from './FileUpload.jsx';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import { Modal } from 'react-bootstrap';
import PaperTigerHeader from './PaperTigerHeader.js';
import Results from './results.jsx';
import ResultPage from './resultsPage.jsx';
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
