import React, { Component } from 'react';
import Suggestions from "./suggestions"
import './resultsPage.css';
import { Modal } from 'react-bootstrap';
import UploadSideBar from "./uploadsidebar";
import PaperTigerHeader from './PaperTigerHeader.js';



export default class ResultsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles:  [
  {author: "Please be patient. Machines are learning", title: "Recommendations Currently Loading", why:"Loading"},],
            files: [
            ],
            keyInfo: {projectID: '', userID: ''},
            loading: true,
        };
    }

    update = () => {
        const projectID = this.state.keyInfo.projectID;
        const userID = this.state.keyInfo.userID;

        this.setState({loading: true});

        console.log("DATA REQUEST MADE");
        let seed = (new Date()).getSeconds();
        let messageID = Math.floor(Math.random(seed) * 1000000) + 1;

        console.log("DATA REQUEST MADE " + projectID + 
        " / " + userID);

        fetch(`/backend/results?projectID=${projectID}&userID=${userID}&messageID=${messageID}`)
            .then(resp => resp.json()).then(data => {
                this.setState({articles: data, loading: false});
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
            <div>
            <header>
            <PaperTigerHeader userID={this.props.match.params.userID} />
            </header>
            <div className="ResultsPage">
                <UploadSideBar keyInfo = {this.state.keyInfo} files = {this.state.files} update= {this.update} />
                <Suggestions loading = {this.state.loading} articles = {this.state.articles} />
            </div>
            </div>
        )
    }
}