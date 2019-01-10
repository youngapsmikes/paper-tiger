import React, { Component } from 'react';
import './projectSelection.css';
import { withRouter } from 'react-router-dom';
import Popup from "reactjs-popup";
import { Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import history from "./history";
import { RingLoader } from 'react-spinners';

class Project extends Component {

    visitProject = (e) => {
        const path = "/results/" + this.props.userID + '/' + this.props.id;

        history.push(path);
    }

    preventRedirect = (e) => {
        e.stopPropagation();
    }
    

    render() {

        return (
            <React.Fragment>
                <li className="list-group-mine">
                <div class="listContent" onClick={this.visitProject}>
                    <div class="spacing"></div>
                    <div class="projectTitle">{this.props.name}</div>
                    <div class = "removeButton" onClick={this.preventRedirect}>
                        <Popup trigger={<Button className="removebutton"> &times; </Button>} 
                        modal>
                        {close => (
                        <div class="UploadPopup">
                            <a className="close" onClick={close}> &times; </a>

                            <div class="UploadPopupHeader"><h2>Are you sure you want to delete this project?</h2></div>
                            This action can't be undone.
                            <hr></hr>
                            <div className="actions">
                                <Button
                                className="button"
                                onClick={() => {
                                this.props.delete(this.props.id)
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
                    </div>
                </div>
                </li>
            </React.Fragment>
        );
    }
}

class ProjectTable extends Component {
    render() {
        const loading = this.props.loading;

        const rows = [];

        if (this.props.projects.length == 0) {
            return (
            <React.Fragment>
            <div class="warningtext">
            To get started, use "+" to create a new project.
            </div>
        </React.Fragment>
            )
        }

        if (!loading) {
            for (let i = 0; i < this.props.projects.length; i++) {
                let project = this.props.projects[i];
                rows.push(<Project name = {project.name} id={project.id} userID = {this.props.userID} delete = {this.props.delete}/>);
            }
        }
        
        if (loading) {
            return (
                <React.Fragment>
                <div class="loading">
                <span class="sr-only">Loading...</span>
                </div>
                <p className="loadingProjectsText">Getting your projects...</p>

                <div className='loadingProjectsIcon'>
                <RingLoader
                sizeUnit={"px"}
                size={150}
                color={'#536976'}
                />
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
            <span class="spacing"></span>
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

        fetch(`https://paper-tiger-server.herokuapp.com/backend/projects?userID=${this.props.userID}&messageID=${messageID}`)
            .then(resp => resp.json()).then(data => {
                this.setState({projects: data, loading: false});
            }).catch((error) => console.log(error));        
    }

    addProject = (projectName) => {

        this.props.authPayload.verifyUser(this.props.userID);

        this.setState({loading: true});
        
        const data = JSON.stringify({
            project: projectName,
            userID: this.props.userID});

        fetch('https://paper-tiger-server.herokuapp.com/backend/newproject', {
        method: 'POST',
        body: data,
      }).then(resp => resp.json()).then(data => {
        this.setState({projects: data, loading: false});
    }).catch((error) => console.log(error));
}

    deleteProject = (projectID) => {

        this.props.authPayload.verifyUser(this.props.userID);

        const project = projectID;
        const user = this.props.userID;

        const payload = JSON.stringify({
            projectID: project,
            userID: user
        });

        this.setState({loading: true});

        fetch('https://paper-tiger-server.herokuapp.com/backend/deleteproject', {
        method: 'POST',
        body: payload,
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
                <ProjectTable delete = {this.deleteProject} loading = {this.state.loading} projects={this.state.projects} userID = {this.props.userID}/>
            </div>
        );
    }
}

export default withRouter(ProjectSelection)