import React from 'react';
import {withRouter} from 'react-router-dom';

class FileUpload extends React.Component {
    constructor(props) {
      super(props);
  
      this.handleUpload = this.handleUpload.bind(this);
    }
  
    handleUpload(ev) {
      ev.preventDefault();

      const user = this.props.keyInfo.userID;
      const project = this.props.keyInfo.projectID;

      const data = new FormData();
      data.append('file', this.uploadInput.files[0]);
      data.append('userID', user);
      data.append('projectID', project);
  
      fetch('https://paper-tiger-server.herokuapp.com/backend/saved', {
        method: 'POST',
        body: data,
      }).then((response) => {
        response.json().then((body) => {
        });
      });
    }
  
    render() {
      return (
        <form onSubmit={this.handleUpload.bind(this)}>
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
