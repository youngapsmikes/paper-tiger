import React from 'react';
import {withRouter} from 'react-router-dom';
import { Button } from 'react-bootstrap';

class FileUpload extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        imageURL: '',
      };
  
      this.handleUploadImage = this.handleUploadImage.bind(this);
    }
  
    handleUploadImage(ev) {
      ev.preventDefault();

      const user = this.props.keyInfo.userID;
      const project = this.props.keyInfo.projectID;

      // We need to pass the user and project to the backend so that it knows 
      // who is uploading this and for what project. But I don't know how to do that and
      // don't wanna fuck with this formdata object b/c its a binary stream
  
     /*  const data = new FormData();
      data.append('file', this.uploadInput.files[0]);
  
      fetch('http://localhost:5000/backend/saved', {
        method: 'POST',
        body: data,
      }).then((response) => {
        response.json().then((body) => {
          this.setState({ imageURL: `http://localhost:5000/${body.file}` });
        });
      }); */

      const data = new FormData();
      data.append('file', this.uploadInput.files[0]);
      data.append('userID', user);
      data.append('projectID', project);
  
      fetch('http://localhost:5000/backend/saved', {
        method: 'POST',
        body: data,
      }).then((response) => {
        response.json().then((body) => {
          this.setState({ imageURL: `http://localhost:5000/${body.file}` });
        });
      });
    }
  
    render() {
      return (
        <form onSubmit={this.handleUploadImage.bind(this)}>
          <div>
            <input ref={(ref) => { this.uploadInput = ref; }} type="file" />
          </div>
          <br />
          <div>
            <button>Upload</button>
          </div>
        </form>
      );
    }
  }
  
  export default withRouter(FileUpload);
