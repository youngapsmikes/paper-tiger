
import React, { Component } from 'react';
import PaperForm from './PaperForm.jsx';
import './Form.css'

class Form extends Component {
  render() {
    return (
      <div className="App">
        <body>
        <div className="static-modal">
        <div className>  
        <h1 className="modalTitle">Paper Tiger</h1>
        </div>
        <div className="App-body">  
        <PaperForm textChange={this.handleChange} />
        </div>
        </div>
        </body>

      </div>
    );
  }
}

export default Form;