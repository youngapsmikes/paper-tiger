import React, { Component } from 'react';
import './articleResults.css';
import Popup from "reactjs-popup";
import { Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import ReactLoading from 'react-loading';

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
            <div className="Author">{this.props.author}</div>
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
                rows.push(<PaperRow author={article.author} title={article.title} why={article.why} link={article.link}/>);
            }
        }

        if (loading) {
            return (
            <React.Fragment>
            <div className="Header">Recommended Articles</div>
            <div className="loading">
            <div className="loadingIcon"><ReactLoading color={'grey'} height={'100px'} width={'200px'} /></div>
            </div>
            </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                <div className="Header">Recommended Articles</div>
                <div className = "Suggestionlist">
                <ListGroup componentClass="ul">
                    {rows}
                </ListGroup>
                </div>
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
