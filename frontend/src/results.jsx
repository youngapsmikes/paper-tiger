import React, { Component } from 'react';
import './results.css';

class PaperRow extends Component {
    render() {
        return (
            <React.Fragment>
            <tr class="primaryRow">
                <td>{this.props.author}</td>
                <td>{this.props.title}</td>
            </tr>
            <tr class="secondaryRow">
            <td colSpan='2'><a><u>Why?</u></a></td>
            </tr>
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
            <table class="resultsTable">
                <thead>
                    <tr class="headerRow">
                        <th>Author(s)</th>
                        <th>Article Title</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
}

export default class Results extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles:  [
  {author: "Quinn Donohue made this", title: "He messed up so click on is this workings (don't worry we will fix in the beta)"}
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

    render() {
        return (
            <div class="results">
                <RecommendationsTable articles={this.state.articles} />
                <button onClick= {this.fetchResult}>Get results</button>
            </div>
        );
    }
}
