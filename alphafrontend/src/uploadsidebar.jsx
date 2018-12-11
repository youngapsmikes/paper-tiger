import React, { Component } from 'react';
import Popup from "reactjs-popup";
import "./uploadsidebar.css";
import FileUpload from './FileUpload.jsx';

class PDFupload extends Component {

    deleterequest = () => {
        const project = this.props.keyInfo.projectID;
        const user = this.props.keyInfo.userID;

        const data = JSON.stringify({
            fileName: this.props.filename,
            projectID: project,
            userID: user});

        fetch('http://localhost:5000/backend/removefile', {
        method: 'POST',
        body: data,
      }).then((response) => {
        response.json().then((body) => {
            console.log("File deletion request" + this.props.filename)
        });
        });
    }

    render() {
        return (
            <React.Fragment>
                <li class="fileresult">
                <span class="filename">
                {this.props.filename}
                </span>
                <span class = "removeButton">
                <Popup trigger={<button className="removebutton"> &times; </button>} 
                modal>
                {close => (
                <div class="UploadPopup">
                    <a className="close" onClick={close}> &times; </a>

                    <div class="UploadPopupHeader"><h2>Are you sure you want to delete this file?</h2></div>
                    This action can't be undone (you'll have to reupload the file).
                    <hr></hr>
                    <div className="actions">
                        <button
                        className="button"
                        onClick={() => {
                        this.deleterequest()
                        this.props.update()
                        close()
                        }}
                        >
                        Yes 
                        </button>
                        <button
                        className="button"
                        onClick={() => {
                        close()
                        }}
                        >
                        No 
                        </button>
                    </div>
                
                </div>
            )}
                </Popup>
                </span>
                </li>
            </React.Fragment>
        );
    }
}

class Sideheader extends Component {
    render() {
        return (
            <div class="sideheader">
            <span class="headerText"> Uploaded Files </span>
            <span class="addbutton">
            <Popup trigger={<button className="addbutton"> + </button>} 
            modal>
            {close => (
                <div class="UploadPopup">
                    <a className="close" onClick={close}> &times; </a>

                    <div class="UploadPopupHeader"><h2>Upload additional Files</h2></div>
                    <FileUpload keyInfo = {this.props.keyInfo} />
                    <hr></hr>
                    <div className="actions">
                        <button
                        className="button"
                        onClick={() => {
                        this.props.update()
                        close()
                        }}
                        >
                        Continue 
                        </button>
                    </div>
                
                </div>
            )}
                </Popup>
            </span>
            </div>
        );
    }
}

class FileTable extends Component {
    render() {
        const rows = [];

        for (let i = 0; i < this.props.files.length; i++) {
            let file = this.props.files[i];
            rows.push(<PDFupload keyInfo = {this.props.keyInfo} filename = {file.name} update={this.props.update}/>);
        }

        return (
            <div class ="fileTable">
            <ul class="sidemenu">
            {rows}
            </ul>
            </div>

        );
    }
}

export default class UploadSideBar extends Component {

    render() {
        return (
            <div class="sidebar">
                <Sideheader keyInfo = {this.props.keyInfo} update={this.props.update} />
                <FileTable keyInfo = {this.props.keyInfo} files={this.props.files} update={this.props.update} />
            </div>
        );
    }
}