import React, { Component } from 'react';
import FileUpload from './FileUpload.jsx';
import { Modal } from 'react-bootstrap';
import './home.css';

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