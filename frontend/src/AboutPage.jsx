import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';
import './about.css';
import {withRouter} from 'react-router-dom';
import PaperTigerHeader from './PaperTigerHeader.js';

class AboutPage extends Component {

    render() {
        return (
          <div>
          <header>
          <PaperTigerHeader userID={this.props.match.params.userID} authPayload={this.props.authPayload}/>
          </header>
          <div className="toplevel">
            <Jumbotron fluid>
                <h1 className="display-4">Behind the Machine Learning</h1>
          <p className="lead">How does paper tiger return recommendations? We use a machine learning algorithm called Latent Dirichlet Allocation (LDA). LDA assumes that documents are generated in the following way. Each document has two corresponding weighted dice. One dice captures the probabilities of various topics. For news, these topics could be categories like politics, culture, or science. Every topic also has a corresponding word dice which captures the probabilities of different words under a given topic. For example, words like "fake news" might be more common under a "politics" topic than a "sports" topic. By assuming this process for generating documents, LDA can then learn topics from a set of documents in an unsupervised way. How does this inference procedure work? We'll have to be hand-wavy here. Basically, we start off with random assignments of words to topics. By examining the co-occurences of words throughout different documents as well the types of words which appear frequently within a particular document (local properties) we can discover the topics underlying a set of documents. </p>
            </Jumbotron>
            </div>
            </div>
        );
      }
}

export default withRouter(AboutPage);
