import React, { Component } from 'react';
import './projectPage.css';
import { Modal } from 'react-bootstrap';
import ProjectSelection from "./projectSelection";
import { withRouter } from 'react-router-dom';



class ResultsPage extends Component {
    render() {
        return (
            <div className="ProjectPage">
                <ProjectSelection />
            </div>
        )
    }
}

export default withRouter(ResultsPage)