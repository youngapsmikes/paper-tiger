import React, { Component } from 'react';
import Suggestions from "./suggestions"
import './resultsPage.css';
import { Modal } from 'react-bootstrap';
import UploadSideBar from "./uploadsidebar";



export default class ResultsPage extends Component {
    render() {
        return (
            <div className="ResultsPage">
                <UploadSideBar />
                <Suggestions />
            </div>
        )
    }
}