import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './App.css';

let DEFAULT_QUERY = 'redux'
// error
// const PATH_BASE = 'https://hn.aolia.com/api/v1';
// correct
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search'
const PARAM_SEARCH = 'query='
const PARAM_PAGE = 'page='

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: null,
      searchKey: '',
      searchTerm: DEFAULT_QUERY,
      error: null,
      isLoading: false
    };
  }

  componentDidMount() {
    const {searchTerm} = this.state
    this.setState({searchKey: searchTerm})
    this.fetchSearchTopStories(searchTerm)
  }

  render() {
    console.log(this.state)
    const {searchTerm, results, searchKey, error, isLoading} = this.state;
    const page = (results && results[searchKey] && results[searchKey].page) || 0
    const list = (results && results[searchKey] && results[searchKey].hits) || []
    return (
      <div className="page">
        <div className="interactions">
          <Search
            value={searchTerm}
            onSubmit={this.onSearchSubmit}
            onChange={this.onSearchChange}
          >
            搜索
          </Search>
        </div>
        <div className='interactions'>
          {isLoading
            ?<Loading />
            :<Button onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}>更多</Button>
          }
        </div>
        {
          error ?
            <div className={'interaction'}>
              <p>请求错误!</p>
            </div>
            : <Table
              list={list}
              onDismiss={this.onDismiss}
            />
        }
      </div>
    );
  }

  onSearchSubmit = (event) => {
    const {searchTerm} = this.state
    this.setState({searchKey: searchTerm})
    if (this.needsToSearchTopStories(searchTerm)) {
      this.fetchSearchTopStories(searchTerm)
    }
    event.preventDefault()
  }

  onSearchChange = (event) => {
    this.setState({searchTerm: event.target.value})
  }

  setSeatchTopStories = (result) => {
    const {hits, page} = result
    const {searchKey, results} = this.state
    const oldHits = results && results[searchKey] ? results[searchKey].hits : []
    const updateHits = [...oldHits, ...hits]
    this.setState({
      results: {
        ...results,
        [searchKey]: {hits: updateHits, page},
        isLoading:false
      }
    })
  }
  // 搜索方法
  fetchSearchTopStories = (searchTerm, page = 0) => {
    this.setState({isLoading:true})
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`)
      .then(response => {
        return response.json()
      }).then(result => {
      return this.setSeatchTopStories(result)
    }).catch(e =>
      //? this是undefined
      this.setState({error: e})
    )
  }

  needsToSearchTopStories = (searchTerm) => {
    return !this.state.results[searchTerm]
  }

  onDismiss = (id) => {
    const {searchKey, results} = this.state
    const {hits, page} = results[searchKey]
    const isNotId = item => item.ObjectId !== id
    const updatedHits = hits.filter(isNotId)
    this.setState({
      // result:Object.assign({},this.state.result,{hits:updatedHits})
      results: {results, [searchKey]: {hits: updatedHits, page}}
    })
  };

}

class Search extends Component {
  componentDidMount() {
    if (this.input) {
      this.input.focus()
    }
  }

  render() {
    const {
      value,
      onChange,
      onSubmit,
      children
    } = this.props
    return (
      <form onSubmit={onSubmit}>
        {children}
        <input
          type="text"
          value={value}
          onChange={onChange}
          ref={(node) => {
            this.input = node
          }}
        />
        <button type="submit">搜索</button>
      </form>
    );
  }
}

// const Search = ({value, children,onSubmit,onChange}) =>
//   <form onSubmit={onSubmit}>
//     {children}
//     <input
//       type="text"
//       value={value}
//       onChange={onChange}
//     />
//     <button type="submit">搜索</button>
//   </form>

const Table = ({list, onDismiss}) =>
  <div className="table">
    {
      list.map((item) => (
        <div key={item.objectID} className='table-row'>
          <span style={{width: '40%'}}>
            <a href={item.url}>{item.title}</a>
          </span>
          <span style={{width: '30%'}}>{item.author}</span>
          <span style={{width: '10%'}}>{item.num_comments}</span>
          <span style={{width: '10%'}}>{item.points}</span>
          <span style={{width: '10%'}}>
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

const Loading = () =>
  <div>Loading...</div>

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired
}
Table.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      objectID: PropTypes.string.isRequired,
      author: PropTypes.string,
      url: PropTypes.string,
      num_comments: PropTypes.number,
      points: PropTypes.number
    })
  ).isRequired,
  onDismiss: PropTypes.func.isRequired
}

export default App;

export {
  Button,
  Search,
  Table
}
