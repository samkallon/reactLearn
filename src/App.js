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
  {
    title: 'microsoft',
    url: 'Https://xxxxx',
    author: 'sam',
    num_comments: 3,
    points: 5,
    objectID: 3,
  },
  {
    title: 'SDE',
    url: 'Https://xxxxx',
    author: 'sam',
    num_comments: 3,
    points: 5,
    objectID: 4,
  },
  {
    title: 'home',
    url: 'Https://xxxxx',
    author: 'sam',
    num_comments: 3,
    points: 5,
    objectID: 5,
  },
  {
    title: 'life',
    url: 'Https://xxxxx',
    author: 'sam',
    num_comments: 3,
    points: 5,
    objectID: 6,
  }
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
      <div className="page">
        <div className="interactions">
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
          >
            搜索
          </Search>
        </div>

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
  <div className="table">
    {
      list.filter(isSearched(pattern)).map((item) => (
        <div key={item.objectID} className='table-row'>
          <span style={{width:'40%'}}>
            <a href={item.url}>{item.title}</a>
          </span>
          <span style={{width:'30%'}}>{item.author}</span>
          <span style={{width:'10%'}}>{item.num_comments}</span>
          <span style={{width:'10%'}}>{item.points}</span>
          <span style={{width:'10%'}}>
                <Button onClick={() => onDismiss(item.objectID)}
                  className='button-inline'
                >
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
