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
          <PaperTigerHeader userID={this.props.match.params.userID} />
          </header>
          <div className="toplevel">
            <Jumbotron fluid>
                <h1 className="display-1">Fluid jumbotron</h1>
          <p className="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
            </Jumbotron>
            </div>
            </div>
        );
      }
}

export default withRouter(AboutPage);
