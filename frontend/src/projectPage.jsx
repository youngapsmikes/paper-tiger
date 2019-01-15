import React, { Component } from 'react';
import './projectPage.css';
import ProjectSelection from "./projectSelection";
import { withRouter } from 'react-router-dom';
import PaperTigerHeader from './PaperTigerHeader.js';



class ProjectPage extends Component {

    render() {
        return (
            <div>
            <header>
            <PaperTigerHeader userID={this.props.match.params.userID} authPayload={this.props.authPayload}/>
            </header>
            <div className="ProjectPage">
                <ProjectSelection userID = {this.props.match.params.userID} authPayload={this.props.authPayload}/>
            </div>
            </div>
        )
    }
}

export default withRouter(ProjectPage)