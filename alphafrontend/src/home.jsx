import React, { Component } from 'react';
import PaperForm from './PaperForm.jsx';
import FileUpload from './FileUpload.jsx';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import { Modal } from 'react-bootstrap';
import './home.css';
import {Link } from 'react-router-dom';

export default class Home extends Component {
    render() {
        return (
          <div className="toplevel">
            <div className="static-modal">
            <Modal.Dialog>
            <Modal.Body>
            <div className="App-body">  
            <h1 className="modalTitle">File Submission</h1>
            </div>
            <div className = "filepond">
            <FilePond server="http://localhost:5000/backend/saved" />
            </div>
            <Link to="/results">
            <button>
               Continue 
            </button>
             </Link>
    
            </Modal.Body>
            </Modal.Dialog>
            </div>
          </div>
        );
      }
}