import React, {Component} from 'react';
import { sortBy } from 'lodash'
import './App.css';
import {Table} from './Table'
import {Search} from './Search'
import {Button, ButtonWithLoading } from './Button'
import classNames from "classnames";

import {
  DEFAULT_QUERY,
  PATH_BASE,
  PATH_SEARCH,
  PARAM_SEARCH,
  PARAM_PAGE
} from './constants'


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: null,
      searchKey: '',
      searchTerm: DEFAULT_QUERY,
      error: null,
      isLoading: false,
    };
  }

  componentDidMount() {
    const {searchTerm} = this.state
    this.setState({searchKey: searchTerm})
    this.fetchSearchTopStories(searchTerm)
  }

  render() {
    console.log(this.state)
    const {searchTerm, results, searchKey, error, isLoading, sortKey, isSortReverse} = this.state;
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
          <ButtonWithLoading
            isLoading={isLoading}
            onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}
          >更多</ButtonWithLoading>
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
      },
      isLoading:false
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

export default App;
