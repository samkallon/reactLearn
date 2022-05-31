import React, { Component } from 'react';
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

  onDismiss = function (id) {
    console.log('id:%s', id);
    console.log(this);
  };

  onSearchChange = (e) => {
    this.setState({ searchTerm: e.target.value });
  };

  render() {
    const { searchTerm, listNew } = this.state;
    return (
      <div className="App">
        <Search
          value={searchTerm}
          onChange={this.onSearchChange}
        />
        <Table
          list={listNew}
          pattern={searchTerm}
          onDismiss={this.onDismiss}
        />
      </div>
    );
  }
}

class Search extends Component {
  render() {
    const { value, onChange } = this.props;
    return (
      <div />
    );
  }
}

export default App;
