import React, { Component } from 'react';
import Popup from "reactjs-popup";
import "./uploadsidebar.css";
import FileUpload from './FileUpload.jsx';

class PDFupload extends Component {

    deleterequest = () => {
        const data = this.props.filename
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
                    <FileUpload />
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
            rows.push(<PDFupload filename = {file.name} update={this.props.update}/>);
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
    constructor(props) {
        super(props);
        this.state = {
            files: [
                {name: "file1.pdf"},
                {name: "file2.pdf"},
                {name: "file3.pdf"},
                {name: "file4.pdf"}
            ],
        };
    }

    fetchResult = () => {
        console.log("DATA REQUEST MADE");
        let seed = (new Date()).getSeconds();
        let messageID = Math.floor(Math.random(seed) * 1000000) + 1;

        fetch(`backend/saved?messageID=${messageID}`)
            .then(resp => resp.json()).then(data => {
                this.setState({files: data});
            }).catch((error) => console.log(error));
    }

    componentDidMount() {
        this.fetchResult();
    }

    render() {
        return (
            <div class="sidebar">
                <Sideheader update={this.fetchResult}/>
                <FileTable files={this.state.files} update={this.fetchResult} />
            </div>
        );
    }
}