import React, { Component } from 'react';
import './articleResults.css';
import Popup from "reactjs-popup";
import { Button, ListGroup} from 'react-bootstrap';
import { RingLoader } from 'react-spinners';


class LowerRow extends Component {
    tagSort = (event, tag) => {
        event.stopPropagation();
        this.props.evaluateTag(tag);
    }

    render() {

        const colorArray = ["#ff0000", "#ffaa00", "#33cc33"];

        var int1 = parseInt(this.props.strength1, 10);
        if (isNaN(int1)) {
            int1 = 0;
        }

        var int2 = parseInt(this.props.strength2, 10);
        if (isNaN(int2)) {
            int2 = 0;
        } 

        var color1 = colorArray[int1];
        var color2 = colorArray[int2];

        const but1 = {
            backgroundColor: String(color1)
        }

        const but2 = {
            backgroundColor: String(color2)
        }

        return (
            <div className="bottom">
            <div className="Author">
            {this.props.author}  
            </div>
            <div className="badge" style={but1} onClick={(e) => {this.tagSort(e, this.props.topic1)}}>
            {this.props.topic1}
            </div>
            <div className="badge" style={but2} onClick={(e) => {this.tagSort(e, this.props.topic2)}}>
            {this.props.topic2}
            </div>
            <div className="spacing"></div>
            </div>

        );
    }
}

class Why extends Component {

    truncateString = (input) => {
        var newFile = input.substring(0, 17);
        newFile = newFile + "...";

        return newFile;
    }

    render() {

        var fileName = this.props.why;

        if (fileName.length > 17) {
            fileName = this.truncateString(fileName);
        } else {
            fileName = fileName + ".";
        }

        return (
            <Popup
                trigger={<Button className="whyButton"> ? </Button>}
                
                position="left top"
                on="hover"
            >
                <div className="UploadPopupHeader">
                <h3>Why?</h3>
                <span className="whyPopup">This article was recommended due to its similarities to {fileName}</span>
                </div>
            </Popup>
            
        );
    }
}

class PaperRow extends Component {
    visitPaper = () => {
        window.open(this.props.link, '_blank');
    }
    render() {
        return (
            <React.Fragment>
            <li className="list-group-mine" onClick={this.visitPaper}>
            <div className="TopRow"><span className="Title">{this.props.title}</span>
            <span className="why"><Why why={this.props.why}/></span>
            </div>
            <div className="BottomRow">
            <LowerRow {...this.props}/>
            </div>
            </li>
            </React.Fragment>
        );
    }
}

class RecommendationsTable extends Component {
    render() {
        console.log(this);

        const loading = this.props.loading;

        var rows = [];

        if (!loading) {
            for (let i = 0; i < this.props.articles.length; i++) {
                let article = this.props.articles[i];
                rows.push(<PaperRow author={article.author} title={article.title} why={article.why} link={article.link} topic1={article.topic1} topic2={article.topic2} strength1={article.strength1} strength2={article.strength2} {...this.props} />);
            }
        }

        if (loading) {
            if (this.props.tag) {
                return (
                <React.Fragment>
                    <div className="tagHeader">
                            <div className="spacing"></div>
                            <div className="tagText">{this.props.tag}</div>
                            <Button className="return" onClick={() => {this.props.back()}}> &#9166; </Button>
                    </div>
                    <div className="loading">
                    <p className="loadingText">Machines are learning...</p>
                    <div className='loadingIcon'>
                        <RingLoader
                        sizeUnit={"px"}
                        size={200}
                        color={'#536976'}
                        />
                    </div>  
                    </div>
                    </React.Fragment>
                    );
            } else {
                return (
                    <React.Fragment>
                    <div className="Header">Recommended Articles</div>
                    <div className="loading">
                    <p className="loadingText">Machines are learning...</p>
                    <div className='loadingIcon'>
                        <RingLoader
                        sizeUnit={"px"}
                        size={200}
                        color={'#536976'}
                        />
                    </div>  
                    </div>
                    </React.Fragment>
                    );
            }
            
        } else {
            if (this.props.tag) {
                return (
                    <React.Fragment>
                        <div className="tagHeader">
                            <div className="spacing"></div>
                            <div className="tagText">{this.props.tag}</div>
                            <Button className="return" onClick={() => {this.props.back()}}> &#9166; </Button>
                        </div>
                    <ListGroup componentClass="ul">
                        {rows}
                    </ListGroup>
                    </React.Fragment>
                );
            } else {
                return (
                    <React.Fragment>
                    <div className="Header">Recommended Articles</div>
                    <ListGroup componentClass="ul">
                        {rows}
                    </ListGroup>
                    </React.Fragment>
                );
            }
        }
    }
}

export default class ArticleResults extends Component {
    render() {

        return (
                <div className="resultsSection">
                <RecommendationsTable {...this.props} />
                </div>
        );
    }
}
