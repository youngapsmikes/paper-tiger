import React, { Component } from 'react';
import './projectPage.css';
import { Modal } from 'react-bootstrap';
import ProjectSelection from "./projectSelection";
import { withRouter } from 'react-router-dom';
import PaperTigerHeader from './PaperTigerHeader.js';



class ResultsPage extends Component {

    componentDidMount() {
        console.log("USER ID: " + this.props.match.params.userID);
    }

    render() {
        return (
            <div>
            <header>
            <PaperTigerHeader userID={this.props.match.params.userID} />
            </header>
            <div className="ProjectPage">
                <ProjectSelection userID = {this.props.match.params.userID} />
            </div>
            </div>
        )
    }
}

export default withRouter(ResultsPage)