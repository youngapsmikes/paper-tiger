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
            <p className="question"><span className="normalText"> 
            paper tiger's machine learning algorithm explicitly examines the contents of articles to produce recommendations. The algorithm then uses topic modeling to learn about the hidden structure of articles and then produces a vector that characterizes the content qualities of any given article. Our algorithm then uses this information to compute similarity scores between uploaded articles and articles in the database. We use these similarity scores to produce recommendations.
            </span></p>
            <p className="question"><strong><span className="normalText">What is topic modeling?</span></strong></p> 
            <p className="question"><span className="normalText">Topic modeling is a machine learning technique for discovering the latent topics within a document. It allows us to represent any document compactly using a small set of numbers that capture the flavor of the document. The specific algorithm we use is Latent Dirichlet Allocation (LDA). LDA assumes that documents are generated in the following way. Suppose each document has two corresponding weighted dice. One dice captures the probabilities of various topics. For news, these topics could be categories like politics, culture, or science. So imagine a dice where each face has a "topic label" and different faces have different probabilities. This captures the intution that different articles are covering different topics. Every topic dice also has a corresponding word dice which captures the probabilities of different words under a given topic. For example, words like "Trump" might be more common under a "politics" topic than a "sports" topic. LDA basically assumes that to generate a document, some oracle rolls a dice to determine the topic and then chooses the corresponding word die. She then rolls this word die many times to generate the contents of the document.
            By assuming this process for generating documents, LDA can then learn topics from a set of documents in an unsupervised way.</span></p>
            <img className="diagram" src={diag} />
            <p className="question"><strong><span className="normalText">How does this inference procedure work? How do we learn the topics?</span></strong></p>
            <p className="question"><span className="normalText">
            Let's start off with some intuition. Consider the oracle above. She's sneaky so she doesn't tell us explicitly what the weights on the various faces of the topic dice and corresponding word dice are. However, we have full access to the results of the oracle's dice rolling (the documents). It makes sense that we should be able to infer (work backwards) the properties of the dice that generated the documents based on the results of her dice rolling. How we do work backwards?
            We'll be hand-wavy here. Basically, the algorithm begins by randomly assigning  words to topics. The algorithm then improves upon this random assignment by examining the co-occurrences of words throughout different documents and the words that appear frequently within a particular document. By understanding these patterns and trends, the algorithm infers the topics.</span></p>
               <p className="question"><strong><span className="normalText">Eh that was too hand-wavy! I want more!</span></strong></p>
            <p className="question"><span className="normalText">
            Ok fine you machine learning nerd! The reason why inference is hard for this problem is because we need to compute an intractable integral. However, brilliant statisticians have found ways to get around this by simulating the samples from the posterior distribution (which is the distribution that effectively tells you how likely the "die" parameters are given our data). It turns out that if we simulate a random walk on a Markov chain (a graph where the states represent an assignment of words to topics) with specific transition probabilities we can approximate the true posterior distribution. The beautiful thing about this is that the transition probabilities favor topic assignments that maximize P(word i | topic j) * P(topic j | document k). Intuitively, the left term represents the probability of the current word given the topic and the right term represents the probability of the current topic given the document. Why is this beautiful? P(word i | topic j) being large means that a topic already owns a lot of instances of the particular word; this word is very common under this topic. P(topic j | document k) being large means that this topic is a "dominant" topic within this particular document. These updates basically respect the local structure of the documents (what kinds of topics dominate my document already) and the global structure across all documents (how is this word being used across all documents). In other words, repeatedly solving this local question that intuitively seems to help inch us towards the global solution actually indeed does lead us to the global solution! This insight made one of the authors realize there was meaning in life.
            </span></p>
            <p className="title"><strong><span className="titleText">Behind the Site</span></strong></p>
            <p className="question"><span className="normalText">paper tiger is a COS333 project made by Quinn Donohue &rsquo;20, Michael Li &rsquo;20, Bisrat Moges &rsquo;20, and Michelle Yuen &rsquo;20, and advised by Jace Lu and Bob Dondero.</span></p>            
            <p className="title"><strong><span className="titleText">Acknowledgments</span></strong></p>
            <p className="question"><span className="normalText">Icons on the homepage were made by <a href="https://www.flaticon.com/authors/eucalyp">Eucalyp</a> and <a href="https://www.flaticon.com/authors/photo3idea-studio"> photo3idea-studio</a> from <a href="https://www.flaticon.com">www.flaticon.com</a></span></p>

            </div>
            </Media>

            </div>
        );
      }
}

export default withRouter(AboutPage);
