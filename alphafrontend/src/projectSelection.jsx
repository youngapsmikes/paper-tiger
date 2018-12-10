import React, { Component } from 'react';
import './projectSelection.css';
import { Modal } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Popup from "reactjs-popup";

class Project extends Component {

    

    render() {

        const newTo = {
            pathname: "/results/" + this.props.id
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
            rows.push(<Project name = {project.name} id={project.id}/>);
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

                    <div class="UploadPopupHeader"><h2>Upload additional Files</h2></div>
                    This is still WIP. Come back later.
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
        console.log("DATA REQUEST MADE");
        let seed = (new Date()).getSeconds();
        let messageID = Math.floor(Math.random(seed) * 1000000) + 1;

        fetch(`backend/projects?messageID=${messageID}`)
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
                <ProjectHeader update={this.fetchResult} />
                <ProjectTable projects={this.state.projects} />
            </div>
        );
    }
}

export default withRouter(ProjectSelection)