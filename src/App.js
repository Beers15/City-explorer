import './App.css';
import { Component } from 'react';
import SearchForm from './Components/SearchForm';
import ResultsDisplay from './Components/ResultsDisplay';
import axios from 'axios';
import Card from 'react-bootstrap/Card';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: {},
      error: '',
    };
  }

  getLocation = async (searchQuery) => {
    let API = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_KEY}&q=${searchQuery}&format=json`;
    let errorFound = false;

    try {
      const res = await axios.get(API);
      this.setState({location: res.data[0]});
    } catch(err) {
      this.setState({error: 'Status Code ' + err.response.status + ': ' + err.response.data.error
                     + '. Please Modify your query and try again.'});
      errorFound = true;
    }
    if(!errorFound) {
      this.setState({error: ''});
    }
  }

  render() {
    return (
      <div className="App">

        <Card bg="success" border="warning" className="app-card">
          <Card.Header className="app-card-header">Location Info</Card.Header>
          <Card.Body>
            <SearchForm getSearchQuery={this.getLocation} />
          </Card.Body>
        </Card>

        {this.state.error && <p id="error-txt">{this.state.error}</p>}

        {(this.state.location.lon && this.state.location.lat) &&
          <ResultsDisplay
            mapSrc={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_KEY}&center=${this.state.location.lat},${this.state.location.lon}&zoom=9`}
            location={this.state.location}
          />
        }
      </div>
    );
  }
}

export default App;
