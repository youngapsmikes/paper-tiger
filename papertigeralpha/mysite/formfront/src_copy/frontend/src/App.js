import React, { Component } from 'react';
import './App.css';
import PaperForm from './PaperForm.jsx';
import Results from './results.jsx';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Paper Tiger</h1>
        </header>
        <div className="App-body">  
        <PaperForm textChange={this.handleChange} />
        </div>
        <div className="Results">
        <Results/>
        </div>
      </div>
    );
  }
}

export default App;
