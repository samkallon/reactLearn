/*
import React from 'react';
import ReactDOM from "react-dom";
import renderer from 'react-test-renderer'
import App from './App';
import {Button,ButtonWithLoading} from "./Button";
import { Search } from './Search'
import { Table } from './Table'
import fetch from 'isomorphic-fetch'

import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('App', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App/>, div)
  });

  test('has a valid snapshot', ()=>{
    const component = renderer.create(
      <App/>
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot();
    }
  )
})

describe('Search',()=>{
  it('renders without crashing',()=>{
    const div = document.createElement('div')
    ReactDOM.render(<Search>Search</Search>,div)
  })
  test('has a valid snapshot',()=>{
    const component = renderer.create(
      <Search>Search</Search>
    )
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot()
  })
})

describe('Table',()=>{
  const props = {
    list:[
      { title: '1', author: '1', num_comments: 1, points: 2, objectID: 'y' },
      { title: '2', author: '2', num_comments: 1, points: 2, objectID: 'z' },
    ]
  }
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Table { ...props } />, div);
  });
  test('has a valid snapshot', () => {
    const component = renderer.create(
      <Table { ...props } />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('shows two items in list',()=>{
    // 浅渲染
    const element = shallow(
      <Table { ...props }></Table>
    )
    expect(element.find('.table-row').length).toBe(2)
  })
})

*/
