import React, { Component } from 'react';
import './projectSelection.css';
import { Modal } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Popup from "reactjs-popup";

class Project extends Component {

    componentDidMount() {
        console.log("USER ID: " + this.props.userID);
    }
    

    render() {

        const newTo = {
            pathname: "/results/" + this.props.userID + '/' + this.props.id
        }

        return (
            <React.Fragment>
                <li class="project">
                <Link to={newTo}>
                {this.props.name}
                </Link>
                </li>
            </React.Fragment>
        );
    }
}

class ProjectTable extends Component {
    render() {
        const rows = [];

        for (let i = 0; i < this.props.projects.length; i++) {
            let project = this.props.projects[i];
            rows.push(<Project name = {project.name} id={project.id} userID = {this.props.userID}/>);
        }

        return (
            <div class ="ProjectTable">
            <ul class="projectList">
            {rows}
            </ul>
            </div>

        );
    }

}

class ProjectForm extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event) {
        this.setState({value: event.target.value});
      }
    
      handleSubmit(event) {
        event.preventDefault();
        const data = JSON.stringify({
            project: this.state.value,
            userID: this.props.userID});

        fetch('http://localhost:5000/backend/newproject', {
        method: 'POST',
        body: data,
      }).then((response) => {
        response.json().then((body) => {
            console.log("New Project Created")
        });
        });

        this.props.cleanup();
        this.props.update();
      }
    
      render() {
        return (
          <form onSubmit={this.handleSubmit}>
            <label>
              Project Title: <br />
              <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <br></br>
            <input type="submit" value="Submit" />
          </form>
        );
      }
}


class ProjectHeader extends Component {
    render() {
        return (
            <div class="ProjectHeader">
            <span class="projectheaderText">Select Project</span>
            <span class="addbutton">
            <Popup trigger={<button className="addbutton"> + </button>} 
            modal>
            {close => (
                <div class="UploadPopup">
                    <a className="close" onClick={close}> &times; </a>

                    <div class="UploadPopupHeader"><h2>Create New Project</h2></div>
                    <ProjectForm cleanup = {close} update = {this.props.update} userID = {this.props.userID}/>
                
                </div>
            )}
                </Popup>
            </span>
            </div>
        );
    }
}

class ProjectSelection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [{name: "Computer Science paper A", id:"1234"},
            {name: "Computer Science paper B", id:"1234"},
            {name: "Computer Science paper C", id:"1234"},
            {name: "Computer Science paper D", id:"1234"},]
        };
    }

    fetchResult = () => {

        fetch(`/backend/projects?userID=${this.props.userID}`)
            .then(resp => resp.json()).then(data => {
                this.setState({projects: data});
            }).catch((error) => console.log(error));
    }

    componentDidMount() {
        this.fetchResult();
    }

    render() {
        return (
            <div class="Projects">
                <ProjectHeader update={this.fetchResult} userID = {this.props.userID} />
                <ProjectTable projects={this.state.projects} userID = {this.props.userID}/>
            </div>
        );
    }
}

export default withRouter(ProjectSelection)