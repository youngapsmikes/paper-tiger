import React, { Component } from 'react';
import Popup from "reactjs-popup";
import "./uploadsidebar.css";

class PDFupload extends Component {
    render() {
        return (
            <React.Fragment>
                <li class="fileresult">
                <span class="filename">
                {this.props.filename}
                </span>
                <span class = "removeButton">
                <Popup trigger={<button className="removebutton"> &times; </button>} 
                modal
                closeOnDocumentClick>
                <span> Uh oh. WIP. Come back next week for the beta</span>
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
            modal
            closeOnDocumentClick>
                <span>WIP. Sorry this stuff is hard. Come back next week.</span>
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
            rows.push(<PDFupload filename = {file.name}/>);
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

    render() {
        return (
            <div class="sidebar">
                <Sideheader />
                <FileTable files={this.state.files} />
            </div>
        );
    }
}