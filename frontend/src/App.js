import React, { Component } from 'react';
import './App.css';
import PaperForm from './PaperForm.jsx';
import FileUpload from './FileUpload.jsx';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import { Modal } from 'react-bootstrap';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="static-modal">
        <Modal.Dialog>
        <Modal.Body>
        <div className="App-body">  
        <h1 className="modalTitle">Paper Tiger</h1>
        {/* <PaperForm textChange={this.handleChange} /> */}
        </div>
        <div className = "filepond">
        <FilePond server="http://localhost:5000/" />
        </div>
        <div className = "filepond2">
        <FilePond server="http://localhost:5000/" />
        </div>

        </Modal.Body>
        </Modal.Dialog>
        </div>
      </div>
    );
  }
}

export default App;
