//======================================================================
// Results.jsx
// Who to blame for issues: Quinn Donohue
//======================================================================

// Each individual recommended paper will have a row in a table that is being returned


// Each individual recommended paper will have a row in a table that is being returned
class PaperRow extends React.Component {
  render() {
  return (
    <tr> 
    <td>{this.props.author}</td>
    <td>{this.props.title}</td>
    </tr>
  );
}
}

class RecommendationsTable extends React.Component {
  render() {
    
    const rows = [];
    
    this.props.articles.forEach((article) => {
      rows.push(
        <PaperRow
          author={article.author}
          title={article.title}
         />
      );
    });
    
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

class Results extends React.Component {
  render() {
    return (
      <div>
        <RecommendationsTable articles={this.props.articles} />
      </div>
    );
  }
}

const ARTILCES = [
  {author: "Michelle Yuen", title: "Frontend warrior: How to work at Microsoft (and then go on to facebook)"},
  {author: "Michael Li", title: "Why I prefer handling the backend"},
  {author: "Bisrat Moges", title: "The art of the Backend"},
  {author: "Quinn Donohue", title: "How to react to the fact you barely know javascript"}
];


// ========================================

ReactDOM.render(
  <Results articles = {ARTICLES} />,
  document.getElementById('container')
);
