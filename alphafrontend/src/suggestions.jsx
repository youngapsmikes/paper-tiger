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
        };
    }

    fetchResult = () => {
        console.log("DATA REQUEST MADE");
        let seed = (new Date()).getSeconds();
        let messageID = Math.floor(Math.random(seed) * 1000000) + 1;

        fetch(`backend/results?messageID=${messageID}`)
            .then(resp => resp.json()).then(data => {
                this.setState({articles: data});
            }).catch((error) => console.log(error));
    }

    componentDidMount() {
        this.fetchResult();
    }

    render() {
        return (
            <div class="Results">
                <RecommendationsTable articles={this.state.articles} />
            </div>
        );
    }
}
