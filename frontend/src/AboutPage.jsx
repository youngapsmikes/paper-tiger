import React, { Component } from 'react';
import { Media } from 'react-bootstrap';
import './about.css';
import {withRouter} from 'react-router-dom';
import PaperTigerHeader from './PaperTigerHeader.js';
import diag from './diagram.jpg';
class AboutPage extends Component {

    render() {
        return (
          <div>
          <header>
          <PaperTigerHeader userID={this.props.match.params.userID} authPayload={this.props.authPayload}/>
          </header>
          <Media className="about">
          <div className="toplevel">
            <p className="title"><strong><span className="titleText">Behind the Machine Learning</span></strong></p>
            <p className="question"><strong><span className="normalText">How does paper tiger return recommendations?</span></strong></p>
            <p className="question"><span className="normalText">We use a machine learning algorithm called Latent Dirichlet Allocation (LDA). LDA assumes that documents are generated in the following way. Each document has two corresponding weighted dice. One dice captures the probabilities of various topics. For news, these topics could be categories like politics, culture, or science. Every topic also has a corresponding word dice which captures the probabilities of different words under a given topic. For example, words like "fake news" might be more common under a "politics" topic than a "sports" topic. By assuming this process for generating documents, LDA can then learn topics from a set of documents in an unsupervised way. </span></p>
            <img className="diagram" src={diag} />
            <p className="question"><strong><span className="normalText">How does this inference procedure work?</span></strong></p>
            <p className="question"><span className="normalText">We'll have to be hand-wavy here. Basically, we start off with random assignments of words to topics. By examining the co-occurences of words throughout different documents as well the types of words which appear frequently within a particular document (local properties) we can discover the topics underlying a set of documents.</span></p>
            <p className="title"><strong><span className="titleText">Behind the Site</span></strong></p>
            <p className="question"><span className="normalText">paper tiger is a COS333 project made by Quinn Donohue &rsquo;20, Michael Li &rsquo;20, Bisrat Moges &rsquo;20, and Michelle Yuen &rsquo;20, and advised by Jace Lu and Bob Dondero.</span></p>            
            </div>
            </Media>

            </div>
        );
      }
}

export default withRouter(AboutPage);
