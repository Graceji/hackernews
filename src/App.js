import React, { Component } from 'react';
import './App.css';
import Search from './search';
import Table from './table';
import Button from './button';
import Loading from './loading';

const Deafult_query = 'redux';
const Default_page = 0;
const Default_hpp = '100';

const Path_base = 'http://hn.algolia.com/api/v1';
const Path_serach = '/search';
const Param_search = 'query=';
const Param_page = 'page=';
const Param_hpp = 'hitsPerPage=';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state= {
      results: null,
      query: Deafult_query,
      searchKey: '',
      loading: false,
    };

    this.onSearchChange = this.onSearchChange.bind(this);
    this.setSearchTopstories = this.setSearchTopstories.bind(this);
    this.fetchSearchTopstories = this.fetchSearchTopstories.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.needsToSearchTopstories=this.needsToSearchTopstories.bind(this);
  }

  onSearchSubmit(e) {
    e.preventDefault();
    const { query } = this.state;
    this.setState({
      searchKey: query,
    });
    if (this.needsToSearchTopstories(query)) {
      this.fetchSearchTopstories(query, Default_page);
    } 
  }

  onSearchChange(e) {
    this.setState({
      query: e.target.value
    });
  }

  setSearchTopstories(result) {
    const { hits, page } = result;
    const { searchKey } = this.state;

    const oldHits = page === 0 ? [] : this.state.results[searchKey].hits;
    const updatedHits = [...oldHits, ...hits];
    
    this.setState({
      results: {
        ...this.state.results,
        [searchKey]: {
          hits: updatedHits,
          page,
        }
      },
      loading: false
    });
  }

  fetchSearchTopstories(query, page) {
    this.setState({
      loading: true,
    });

    fetch(`${Path_base}${Path_serach}?${Param_search}${query}&${Param_page}${page}&${Param_hpp}${Default_hpp}`)
      .then(res => res.json())
      .then(result => this.setSearchTopstories(result));
  }

  componentDidMount() {
    const { query } = this.state;
    this.setState({ searchKey: query });
    this.fetchSearchTopstories(query, Default_page);
  }

  needsToSearchTopstories(query) {
    return !this.state.results[query];
  }

  render() {
    const { query, results, searchKey, loading } = this.state;
    const page = (results && results[searchKey] && results[searchKey].page) || 0;
    const list = (results && results[searchKey] && results[searchKey].hits) || [];
    const withLoading = Component => ({ loading, ...rest }) =>
      loading ? <Loading /> : <Component {...rest} />;
    const ButtonWithLoading = withLoading(Button);

    return (
      <div className="page">
        <div className="interactions">
          <Search
            onChange={this.onSearchChange}
            value={query}
            onSubmit={this.onSearchSubmit}
          >
            search
          </Search>
        </div>
        <Table list={list} />
        <div className="interactions">
          {/*{
            loading
            ? <Loading />
            : <Button onClick={() => this.fetchSearchTopstories(searchKey, page + 1)}>
                More
              </Button>
          }*/}

          <ButtonWithLoading loading={loading} onClick={() => this.fetchSearchTopstories(searchKey, page+1)}>
            More
          </ButtonWithLoading>
        </div>
      </div>
    );
  }
}
