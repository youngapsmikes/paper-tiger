import React, { Component } from 'react';
import Suggestions from "./suggestions"
import './resultsPage.css';
import { Modal } from 'react-bootstrap';
import UploadSideBar from "./uploadsidebar";



export default class ResultsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles:  [
  {author: "Please be patient. We didn't really optimize", title: "Recommendations Currently Loading", why:"Loading"},],
            files: [
            ],
            keyInfo: {projectID: '', userID: ''}
        };
    }

    update = () => {
        const projectID = this.state.keyInfo.projectID;
        const userID = this.state.keyInfo.userID;

        console.log("DATA REQUEST MADE");
        let seed = (new Date()).getSeconds();
        let messageID = Math.floor(Math.random(seed) * 1000000) + 1;

        console.log("DATA REQUEST MADE " + projectID + 
        " / " + userID);

        fetch(`/backend/results?projectID=${projectID}&userID=${userID}&messageID=${messageID}`)
            .then(resp => resp.json()).then(data => {
                this.setState({articles: data});
            }).catch((error) => console.log(error));

        fetch(`/backend/saved?projectID=${projectID}&userID=${userID}&messageID=${messageID}`)
            .then(resp => resp.json()).then(data => {
                this.setState({files: data});
            }).catch((error) => console.log(error));
    }

    componentDidMount() {
        
        this.setState({keyInfo: {projectID: this.props.match.params.projectID, userID: this.props.match.params.userID}},
            () => {this.update();});
    }

    render() {
        return (
            <div className="ResultsPage">
                <UploadSideBar keyInfo = {this.state.keyInfo} files = {this.state.files} update= {this.update} />
                <Suggestions articles = {this.state.articles} />
            </div>
        )
    }
}