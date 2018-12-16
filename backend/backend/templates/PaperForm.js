import React from 'react';
import ReactDOM from 'react-dom';
import './PaperForm.css';

class PaperForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      author: '',
      abstract: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    alert('A title was submitted: ' + this.state.title + '\nAn author was submitted ' + this.state.author + '\nAn abstract was submitted ' + this.state.abstract);
    event.preventDefault();
    fetch('/', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: {
        "title": this.state.title,
        "author": this.state.author,
        "abstract": this.state.abstract
      }
    });
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
    return React.createElement(
      'div',
      { className: 'column' },
      React.createElement(
        'form',
        { onSubmit: this.handleSubmit },
        React.createElement(
          'div',
          { className: 'field' },
          React.createElement(
            'label',
            { className: 'label' },
            'Title: '
          ),
          React.createElement('input', {
            className: 'input',
            type: 'text',
            name: 'title',
            onChange: this.handleChange,
            value: title,
            required: true
          })
        ),
        React.createElement(
          'div',
          { className: 'field' },
          React.createElement(
            'label',
            { className: 'label' },
            'Author: '
          ),
          React.createElement('input', {
            className: 'input',
            type: 'text',
            name: 'author',
            onChange: this.handleChange,
            value: author,
            required: true
          })
        ),
        React.createElement(
          'div',
          { className: 'field' },
          React.createElement(
            'label',
            { className: 'label' },
            'Abstract: '
          ),
          React.createElement('textarea', {
            className: 'textarea',
            type: 'text',
            name: 'abstract',
            onChange: this.handleChange,
            value: abstract,
            required: true
          })
        ),
        React.createElement(
          'div',
          { className: 'control' },
          React.createElement(
            'button',
            { type: 'submit', className: 'button is-info' },
            'Submit'
          )
        )
      )
    );
  }
}

ReactDOM.render(
  <PaperForm />,
  document.getElementById('root')
); 

// export default PaperForm;