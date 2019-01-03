import React, { Component } from 'react';
import './suggestions.css';
import Popup from "reactjs-popup";
import { Button } from 'react-bootstrap';
import ReactLoading from 'react-loading';

class Why extends Component {
    render() {
        return (
            <Popup
                trigger={<Button className="whyButton"> ? </Button>}
                modal
                closeOnDocumentClick
            >
                <div class="UploadPopupHeader">
                <h2>Why was this article suggested?</h2>
                <span class="whyPopup">This article was recommended due to its similarities to {this.props.why}.</span>
                </div>
            </Popup>

        );
    }
}

class PaperRow extends Component {
    visitPaper = () => {
        console.log(this.props);
        window.open(this.props.link, '_blank');
    }
    render() {
        return (
            <React.Fragment>
            <li class="Article">
            <div class="TopRow"><span class="Title">{this.props.title}</span>
            <span class="why"><Why why={this.props.why}/></span>
            <span class="link"><Button onClick={this.visitPaper}>View</Button></span>
            </div>
            <div class="Author">{this.props.author}</div>
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
            <div class="Header">Recommended Articles</div>
            <div class="loading">
            <div class="loadingIcon"><ReactLoading color={'grey'} height={'10%'} width={'100%'} /></div>
            </div>
            </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                <div class="Header">Recommended Articles</div>
                <ul class="Suggestionlist">
                <li></li>
                {rows}
                </ul>
                </React.Fragment>
            );
        }
    }
}

export default class Suggestions extends Component {
    render() {

        return (
            <div class="Results">
                <RecommendationsTable loading = {this.props.loading} articles={this.props.articles} />
            </div>
        );
    }
}
