import React, { Component } from 'react';
import Results from "./results";
import './resultsPage.css';
import { Modal } from 'react-bootstrap';
import UploadSideBar from "./uploadsidebar";



export default class ResultsPage extends Component {
    render() {
        return (
            <div className="toplevel">
                <UploadSideBar />
                <Results />
            </div>
        )
    }
}