import React, { Component } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';


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
      <InputGroup id="search-form" className="mb-3">
        <FormControl
          placeholder="Enter the name of a city"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          onChange={(e) => this.setState({ searchQuery: e.target.value })}
          value={this.state.searchQuery}
        />
        <Button
          variant="warning"
          id="button-addon2"
          onClick={this.handleSubmit}
        >
          Send
        </Button>
      </InputGroup>
    );
  }
}
