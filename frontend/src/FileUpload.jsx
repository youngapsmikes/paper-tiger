import React from 'react';
import './bootstrap.css';
import './FileUpload.css';
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
  
      const data = new FormData();
      data.append('file', this.uploadInput.files[0]);
  
      fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: data,
      }).then((response) => {
        response.json().then((body) => {
          this.setState({ imageURL: `http://localhost:8000/${body.file}` });
        });
      });
    }
  
    render() {
      return (
        <form onSubmit={this.handleUploadImage}>
          <div className="fileSelector">
            <input ref={(ref) => { this.uploadInput = ref; }} type="file" />
          </div>
          <br />
          <div>
            <Button>Upload</Button>
          </div>
        </form>
      );
    }
  }
  
  export default FileUpload;
