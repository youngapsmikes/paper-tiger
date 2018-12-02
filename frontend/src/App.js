import React, { Component } from 'react';
import 'filepond/dist/filepond.min.css';
import './bootstrap.css';
import Home from './Home';
import Form from './Form';
class App extends Component {
  render() {
    return (
      <div className="App">
        <Home />
      </div>
    );
  }
}

export default App;
