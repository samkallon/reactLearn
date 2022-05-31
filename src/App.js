import React, {Component} from 'react';
import './App.css';

const list = [
  {
    title: 'React',
    url: 'Https://xxxxx',
    author: 'sam',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'Https://xxxxx',
    author: 'sam',
    num_comments: 3,
    points: 5,
    objectID: 1,
  },
  {
    title: 'React-router',
    url: 'Https://xxxxx',
    author: 'sam',
    num_comments: 3,
    points: 5,
    objectID: 2,
  },
];
const isSearched = (searchTerm) => (item) => item.title.toLowerCase().includes(searchTerm.toLowerCase());

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list,
      searchTerm: '',
    };
  }

  onDismiss = (id) => {
    console.log('id:%s', id);
    console.log(this);
  };

  onSearchChange = (e) => {
    this.setState({searchTerm: e.target.value});
  };

  render() {
    const {searchTerm, list} = this.state;
    return (
      <div className="App">
        <Search
          value={searchTerm}
          onChange={this.onSearchChange}
        >
          搜索
        </Search>
        <Table
          list={list}
          pattern={searchTerm}
          onDismiss={this.onDismiss}
        />
      </div>
    );
  }
}

const Search = ({value, onChange, children}) =>
  <form>
    {children}
    <input
      type="text"
      value={value}
      onChange={onChange}
    />
  </form>

const Table = ({list, pattern, onDismiss}) =>

  <div>
    {
      list.filter(isSearched(pattern)).map((item) => (
        <div key={item.objectID}>
              <span>
                <a href={item.url}>{item.title}</a>
              </span>
          <span>{item.author}</span>
          <span>{item.num_comments}</span>
          <span>{item.points}</span>
          <span>
                <Button onClick={() => onDismiss(item.objectID)}>
                  Dismiss
                </Button>
              </span>
        </div>
      ))
    }
  </div>

const Button = ({onClick, className = '', children}) =>
  <button
    onClick={onClick}
    className={className}
    type="button"
  >
    {children}
  </button>

export default App;
