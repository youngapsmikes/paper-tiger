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
  {author: "Quinn Donohue made this", title: "He messed up so click on is this workings (don't worry we will fix in the beta)"},
  {author: "Test Author here", title: "Software Engineering Mechanics"},
  {author: "Test Author here", title: "Software Engineering Mechanics A"},
  {author: "Test Author here", title: "Software Engineering Mechanics B "},
  {author: "Test Author here", title: "Software Engineering Mechanics C"},
  {author: "Test Author here", title: "Software Engineering Mechanics D"},
  {author: "Test Author here", title: "Software Engineering Mechanics E"}
],
            files: [
                {name: "file1.pdf"},
                {name: "file2.pdf"},
                {name: "file3.pdf"},
                {name: "file4.pdf"}
            ],
            keyInfo: {projectID: '', userID: ''}
        };
    }

    update = () => {
        const projectID = this.state.keyInfo.projectID;
        const userID = this.state.keyInfo.userID;

        console.log("DATA REQUEST MADE " + projectID + 
        " / " + userID);

        fetch(`/backend/results?projectID=${projectID}&userID=${userID}`)
            .then(resp => resp.json()).then(data => {
                this.setState({articles: data});
            }).catch((error) => console.log(error));

        fetch(`/backend/saved?projectID=${projectID}&userID=${userID}`)
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