import React, { Component } from 'react';

export default class SearchButton extends Component {
  constructor(props) {
    super(props);

    this.state={searchQuery: ''};
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.getSearchQuery(this.state.searchQuery);
    this.setState({searchQuery: ''});
  }

  render() {
    return (
      <div>
        <input type="text" onChange={(e) => this.setState({ searchQuery: e.target.value })} value={this.state.searchQuery} placeholder="Enter the name of a city"></input>
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    );
  }
}
