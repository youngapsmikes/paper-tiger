import React, { Component } from 'react';
import PaperForm from './PaperForm.jsx';
import FileUpload from './FileUpload.jsx';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import { Modal } from 'react-bootstrap';
import './home.css';

export default class Home extends Component {
    render() {
        return (
          <div className="toplevel">
            <div className="static-modal">
            <Modal.Dialog>
            <Modal.Body>
            <div className="App-body">  
            <h1 className="modalTitle">File Submission</h1>
            <PaperForm textChange={this.handleChange} />
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