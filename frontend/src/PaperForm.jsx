import React from 'react';
import ReactDOM from 'react-dom';
import './PaperForm.css';
import {withRouter} from 'react-router-dom';

class PaperForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            author: '',
            abstract: ''};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({[name]: value});
      }
    
      handleSubmit(event) {
       /*  alert('A title was submitted: ' + this.state.title + 
              '\nAn author was submitted ' + this.state.author +
              '\nAn abstract was submitted ' + this.state.abstract); */
        event.preventDefault();
        fetch('/backend/create', {
          method: 'post',
          headers: {'Content-Type':'application/json'},
          body: {
            "title": this.state.title,
            "author": this.state.author,
            "abstract": this.state.abstract
          }
        });
        this.props.history.push('/results');
      }
   
      render() {
      //   return (
      //     <div className="form">
      //     <form onSubmit={this.handleSubmit}>
      //       <label>
      //         Name:
      //         <input type="text" value={this.state.value} onChange={this.handleChange} />
      //       </label>
      //       <input type="submit" value="Submit" />
      //     </form>
      //     </div>
      //   );
      // }
      const { title, author, abstract } = this.state;
      return (
        <div className="column" class="toplevel">
          <form onSubmit={this.handleSubmit.bind(this)}>
            <div className="field">
              <label className="label">Title: </label>
                <input
                  className="input"
                  type="text"
                  name="title"
                  onChange={this.handleChange}
                  value={title}
                  required
                />
            </div>
            <div className="field">
              <label className="label">Author: </label>
                <input
                  className="input"
                  type="text"
                  name="author"
                  onChange={this.handleChange}
                  value={author}
                  required
                />
            </div>
            <div className="field">
              <label className="label">Abstract: </label>
                <textarea
                  className="textarea"
                  type="text"
                  name="abstract"
                  onChange={this.handleChange}
                  value={abstract}
                  required
                />
            </div>
            <div className="control">
              <button type="submit" className="button is-info">
                Submit
              </button>
            </div>
          </form>
        </div>
      );
  
    }
  }
    
    /*ReactDOM.render(
      <PaperForm />,
      document.getElementById('root')
    ); */
    
    export default withRouter(PaperForm);