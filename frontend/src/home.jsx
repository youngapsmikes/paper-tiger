import React, { Component } from 'react';
import FileUpload from './FileUpload.jsx';
import 'filepond/dist/filepond.min.css';
import { Modal } from 'react-bootstrap';
import './Home.css';

export default class Home extends Component {
    render() {
        return (
          <div className="toplevel">
            <Modal.Dialog>
            <Modal.Body>
            <div className="App-body">  
            <h1 className="modalTitle">Paper Tiger</h1>
            </div>
            <div className = "fileupload">
            <FileUpload />
            </div>    
            </Modal.Body>
            </Modal.Dialog>
            </div>
        );
      }
}