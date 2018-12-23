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

    deleterequest = (givenfileName, projectID, userID) => {
        const project = projectID;
        const user = userID;

        
        let seed = (new Date()).getSeconds();
        let messageID = Math.floor(Math.random(seed) * 1000000) + 1;

        const payload = JSON.stringify({
            fileName: givenfileName,
            projectID: project,
            userID: user
        });

        this.setState({loading: true});

        fetch('http://localhost:5000/backend/removefile', {
        method: 'POST',
        body: payload,
      }).then(resp => resp.json()).then(data => {
        this.setState({files: data});
    }).catch((error) => console.log(error));

        fetch(`/backend/results?projectID=${projectID}&userID=${userID}&messageID=${messageID}`)
            .then(resp => resp.json()).then(data => {
                this.setState({articles: data, loading: false});
            }).catch((error) => console.log(error));
    }

    addFile(ev) {
        ev.preventDefault();
        console.log(this);

        const user = this.props.keyInfo.userID;
        const project = this.props.keyInfo.projectID;

         
        let seed = (new Date()).getSeconds();
        let messageID = Math.floor(Math.random(seed) * 1000000) + 1;

        const data = new FormData();
        data.append('file', this.uploadInput.files[0]);
        data.append('userID', user);
        data.append('projectID', project);
    
        fetch('http://localhost:5000/backend/saved', {
            method: 'POST',
            body: data,
        }).then(resp => resp.json()).then(data => {
            this.setState({files: data, loading: true});
        }).catch((error) => console.log(error));

        fetch(`/backend/results?projectID=${project}&userID=${user}&messageID=${messageID}`)
            .then(resp => resp.json()).then(data => {
                this.setState({articles: data, loading: false});
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
                <UploadSideBar keyInfo = {this.state.keyInfo} files = {this.state.files} update= {this.update} deleterequest={this.deleterequest} add={this.addFile}/>
                <Suggestions loading = {this.state.loading} articles = {this.state.articles} />
            </div>
            </div>
        )
    }
}