import React, { Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Search from './search';
import List from './list';

const list = [
  {
    title: 'React',
    url: 'https://facebook.github.io/react/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: '“https://github.com/reactjs/redux',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  }
];

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state= {
      list,
      query: '',
    };

    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onSearchChange(e) {
    this.setState({
      query: e.target.value
    });
  }

  render() {
    const helloWorld = 'Welcome to React!';
    const { query, list } = this.state;
    return (
      <div className="page">
        <div className="App-header">
          <img src={logo} alt="" className="App-logo"/>
          <h2>{helloWorld}</h2>
        </div>
        <div className="interactions">
          <Search handleChange={this.onSearchChange} value={query}/>search
          <List list={list} query={query} />
        </div>
      </div>
    );
  }
}
