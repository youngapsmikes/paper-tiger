import React, { Component } from 'react';
import './projectSelection.css';
import { Modal } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Popup from "reactjs-popup";
import ReactLoading from 'react-loading';
import { Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import history from "./history";

class Project extends Component {

    componentDidMount() {
        console.log("USER ID: " + this.props.userID);
    }

    visitProject = () => {
        const path = "/results/" + this.props.userID + '/' + this.props.id;

        history.push(path);
    }
    

    render() {

        return (
            <React.Fragment>
                <li className="list-group-mine" onClick={this.visitProject}>
                {this.props.name}
                </li>
            </React.Fragment>
        );
    }
}

class ProjectTable extends Component {
    render() {
        const loading = this.props.loading;

        const rows = [];

        if (!loading) {
            for (let i = 0; i < this.props.projects.length; i++) {
                let project = this.props.projects[i];
                rows.push(<Project name = {project.name} id={project.id} userID = {this.props.userID}/>);
            }
        }
        
        if (loading) {
            return (
                <React.Fragment>
                <div class="loading">
                <div class="loadingIcon"><ReactLoading color={'grey'} height={'100px'} width={'300px'} /></div>
                </div>
                </React.Fragment>
                );
        } else {
            return (
                <div class ="ProjectTable">
                <ListGroup componentClass="ul">
                    {rows}
                </ListGroup>
                </div>
            );
        }        
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
        this.props.addProject(this.state.value);
        this.props.cleanup();
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
            <Popup trigger={<Button className="addbutton"> + </Button>} 
            modal>
            {close => (
                <div class="UploadPopup">
                    <a className="close" onClick={close}> &times; </a>

                    <div class="UploadPopupHeader"><h2>Create New Project</h2></div>
                    <ProjectForm cleanup = {close} update = {this.props.update} addProject = {this.props.addProject}/>
                
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
            projects: [{name: "Loading in Projects", id:"1234"},],
            loading: true
        };
    }

    fetchResult = () => {

        this.props.authPayload.verifyUser(this.props.userID);

        this.setState({loading: true});

        let seed = (new Date()).getSeconds();
        let messageID = Math.floor(Math.random(seed) * 1000000) + 1;

        fetch(`http://localhost:5000/backend/projects?userID=${this.props.userID}&messageID=${messageID}`)
            .then(resp => resp.json()).then(data => {
                this.setState({projects: data, loading: false});
            }).catch((error) => console.log(error));        
    }

    addProject = (projectName) => {

        this.props.authPayload.verifyUser(this.props.userID);

        this.setState({loading: true})
        
        const data = JSON.stringify({
            project: projectName,
            userID: this.props.userID});

        fetch('http://localhost:5000/backend/newproject', {
        method: 'POST',
        body: data,
      }).then(resp => resp.json()).then(data => {
        this.setState({projects: data, loading: false});
    }).catch((error) => console.log(error));
        

    }

    componentDidMount() {
        this.fetchResult();
    }

    render() {
        return (
            <div class="Projects">
                <ProjectHeader update={this.fetchResult} userID = {this.props.userID} addProject = {this.addProject}/>
                <ProjectTable loading = {this.state.loading} projects={this.state.projects} userID = {this.props.userID}/>
            </div>
        );
    }
}

export default withRouter(ProjectSelection)