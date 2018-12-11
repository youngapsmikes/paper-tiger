import React, { Component } from 'react';
import './suggestions.css';

class PaperRow extends Component {
    render() {
        return (
            <React.Fragment>
            <li class="Article">
            <div class="Title">{this.props.title}</div>
            <div class="Author">{this.props.author}</div>
            </li>
            </React.Fragment>
        );
    }
}

class RecommendationsTable extends Component {
    render() {

        const rows = [];

        for (let i = 0; i < this.props.articles.length; i++) {
            let article = this.props.articles[i];
            rows.push(<PaperRow author={article.author} title={article.title}/>);

        }

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

export default class Suggestions extends Component {
    render() {

        return (
            <div class="Results">
                <RecommendationsTable articles={this.props.articles} />
            </div>
        );
    }
}
