import React, { Component } from 'react';
import Popup from "reactjs-popup";
import "./uploadsidebar.css";
import FileUpload from './FileUpload.jsx';
import { Button, ListGroup, ListGroupItem } from 'react-bootstrap';

class DeleteButton extends Component {

    render() {
        return (
            <Popup trigger={<Button className="removebutton"> &times; </Button>} 
                modal>
                {close => (
                <div class="UploadPopup">
                    <a className="close" onClick={close}> &times; </a>

                    <div class="UploadPopupHeader"><h2>Are you sure you want to delete this file?</h2></div>
                    This action can't be undone (you'll have to reupload the file).
                    <hr></hr>
                    <div className="actions">
                        <Button
                        className="button"
                        onClick={() => {
                        this.props.deleterequest(this.props.filename, this.props.keyInfo.projectID, this.props.keyInfo.userID)
                        close()
                        }}
                        >
                        Yes 
                        </Button>
                        <Button
                        className="button"
                        onClick={() => {
                        close()
                        }}
                        >
                        No 
                        </Button>
                    </div>
                
                </div>
            )}
                </Popup>
        );
    }

}

class PDFupload extends Component {

    render() {
        return (
            <React.Fragment>
                <li className="list-group-mine">
                <div class="uploadedPayload">
                <span class="filename">
                {this.props.filename}
                </span>
                <span class = "removeButton">
                <DeleteButton {...this.props} />
                </span>
                </div>
                </li>
            </React.Fragment>
        );
    }
}

class Sideheader extends Component {
    constructor(props) {
        super(props);
        this.state = {uploaded: false};
    }
    render() {
        return (
            <div class="sideheader">
            <span class="headerText"> Uploaded Files </span>
            <span class="addbutton">
            <Popup trigger={<Button className="addbutton"> + </Button>} 
            modal>
            {close => (
                <div class="UploadPopup">
                    <a className="close" onClick={close}> &times; </a>

                    <div class="UploadPopupHeader"><h2>Upload additional Files</h2></div>
                        <form onSubmit={this.props.add.bind(this)}>
                            <div>
                                <input ref={(ref) => { this.uploadInput = ref; }} type="file" />
                                <span class="checkmark" id="uploadedCheck"></span>
                            </div>
                            <br />
                            <div>
                                <button>Upload</button>
                            </div>
                        </form>
                    <hr></hr>
                    <div className="actions">
                        <Button
                        className="button"
                        onClick={() => {
                        close()
                        }}
                        >
                        Continue 
                        </Button>
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

        if (this.props.files.length == 0) {
            return (
                <div class="fileTable">
                <div class="emptyNotice">
                To get started, upload a file using the "+" in the header.
                </div>
                </div>
            )
        }

        for (let i = 0; i < this.props.files.length; i++) {
            let file = this.props.files[i];
            rows.push(<PDFupload keyInfo = {this.props.keyInfo} filename = {file.name} deleterequest={this.props.deleterequest}/>);
        }

        return (
            <div class ="fileTable">
            <ListGroup componentClass="ul">
                {rows}
            </ListGroup>
            </div>

        );
    }
}

export default class UploadSideBar extends Component {

    render() {
        return (
            <div class="sidebar">
                <Sideheader keyInfo = {this.props.keyInfo} authPayload ={this.props.authPayload} update={this.props.update} add = {this.props.add} updateStateFiles = {this.props.updateStateFiles} updateStateSuggestions = {this.props.updateStateSuggestions}/>
                <FileTable keyInfo = {this.props.keyInfo} files={this.props.files} update={this.props.update} deleterequest={this.props.deleterequest} />
            </div>
        );
    }
}