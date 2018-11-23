import React, { Component } from 'react';

class PaperRow extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.author}</td>
                <td>{this.props.title}</td>
            </tr>
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
            <table>
                <thead>
                    <tr>
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
  {author: "Michelle Yuen", title: "Frontend warrior: How to work at Microsoft (and then go on to facebook)"},
  {author: "Michael Li", title: "Why I prefer handling the backend"},
  {author: "Bisrat Moges", title: "The art of the Backend"},
  {author: "Quinn Donohue", title: "How to react to the fact you barely know javascript"}
],
        };
    }

    fetchResult = () => {
        console.log("DATA REQUEST MADE");
        let seed = (new Date()).getSeconds();
        let messageID = Math.floor(Math.random(seed) * 1000000) + 1;

        fetch(`backend/create?messageID=${messageID}`)
            .then(resp => resp.json()).then(data => {
                this.setState({articles: data});
            }).catch((error) => console.log(error));
    }

    render() {
        return (
            <div>
                <RecommendationsTable articles={this.state.articles} />
                <button onClick= {this.fetchResult}>Get results</button>
            </div>
        );
    }
}