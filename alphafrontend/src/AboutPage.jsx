import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';
import './about.css';
import {withRouter} from 'react-router-dom';

class AboutPage extends Component {

    render() {
        return (
          <div className="toplevel">
            <Jumbotron fluid>
                <h1 className="display-1">Fluid jumbotron</h1>
          <p className="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
            </Jumbotron>
            </div>
        );
      }
}

export default withRouter(AboutPage);
