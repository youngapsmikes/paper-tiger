import React, { Component } from 'react';
import './articleResults.css';
import Popup from "reactjs-popup";
import { Button, ListGroup, ListGroupItem, Label } from 'react-bootstrap';
import ReactLoading from 'react-loading';

class LowerRow extends Component {
    render() {

        const colorArray = ["#ff0000", "#ffaa00", "#33cc33"];

        var int1 = parseInt(this.props.strength1, 10);
        if (isNaN(int1)) {
            int1 = 0;
        }

        var int2 = parseInt(this.props.strength2, 10);
        if (isNaN(int2)) {
            int2 = 0;
        } 

        var color1 = colorArray[int1];
        var color2 = colorArray[int2];

        const but1 = {
            backgroundColor: String(color1)
        }

        const but2 = {
            backgroundColor: String(color2)
        }

        return (
            <div className="bottom">
            <div className="Author">
            {this.props.author}  
            </div>
            <div className="badge" style={but1}>
            {this.props.topic1}
            </div>
            <div className="badge" style={but2}>
            {this.props.topic2}
            </div>
            <div className="spacing"></div>
            </div>

        );
    }
}


class Why extends Component {
    render() {
        return (
            <Popup
                trigger={<Button className="whyButton"> ? </Button>}
                
                position="left top"
                on="hover"
            >
                <div className="UploadPopupHeader">
                <h3>Why?</h3>
                <span className="whyPopup">This article was recommended due to its similarities to {this.props.why}.</span>
                </div>
            </Popup>

        );
    }
}

class PaperRow extends Component {
    visitPaper = () => {
        window.open(this.props.link, '_blank');
    }
    render() {
        return (
            <React.Fragment>
            <li className="list-group-mine" onClick={this.visitPaper}>
            <div className="TopRow"><span className="Title">{this.props.title}</span>
            <span className="why"><Why why={this.props.why}/></span>
            </div>
            <div className="BottomRow">
            <LowerRow {...this.props}/>
            </div>
            </li>
            </React.Fragment>
        );
    }
}

class RecommendationsTable extends Component {
    render() {

        const loading = this.props.loading;

        var rows = [];

        if (!loading) {
            for (let i = 0; i < this.props.articles.length; i++) {
                let article = this.props.articles[i];
                rows.push(<PaperRow author={article.author} title={article.title} why={article.why} link={article.link} topic1={article.topic1} topic2={article.topic2} strength1={article.strength1} strength2={article.strength2}/>);
            }
        }

        if (loading) {
            return (
            <React.Fragment>
            <div className="Header">Recommended Articles</div>
            <div className="loading">
            <div className="loadingIcon"><ReactLoading color={'grey'} height={'10%'} width={'100%'} /></div>
            </div>
            </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                <div className="Header">Recommended Articles</div>
                <ListGroup componentClass="ul">
                    {rows}
                </ListGroup>
                </React.Fragment>
            );
        }
    }
}

export default class ArticleResults extends Component {
    render() {

        return (
            <div className="Results">
                <RecommendationsTable loading = {this.props.loading} articles={this.props.articles} />
            </div>
        );
    }
}
