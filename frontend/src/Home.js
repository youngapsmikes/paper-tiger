import React, { Component } from 'react';
import './Home.css';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import './bootstrap.css';
import { Button } from 'react-bootstrap';
import FileUpload from './FileUpload.jsx';

class Home extends Component {
  render() {
    return (
      <div className="App">
        <body className="App-body">
        <div className="static-modal">
        <div className>  
        <h1 className="modalTitle">Paper Tiger</h1>
        {/* <PaperForm textChange={this.handleChange} /> */}
        </div>
        <div className = "filepond">
        <FileUpload />
        </div>
        <h2>or</h2>
        <div className = "button1">
        <Button bsSize="large">Submit a Form</Button>
        </div>

        </div>
        </body>
      </div>
    );
  }
}

export default Home;
