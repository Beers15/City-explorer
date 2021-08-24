import './App.css';
import { Component } from 'react';
import SearchForm from './Components/SearchForm';
import axios from 'axios';
import Card from 'react-bootstrap/Card';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: {},
      error: '',
      map: null,
    };
  }

  getLocation = async (q) => {
    let API = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_KEY}&q=${q}&format=json`;

    try {
      const res = await axios.get(API);
      this.setState({location: res.data[0]});
    } catch(err) {
      this.setState({error: 'Status Code ' + err.response.status + ': ' + err.response.data.error
                     + '. Please Modify your query and try again.'});
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
          <Card bg="success" border="warning" className="app-card">
            <Card.Header className="app-card-header">{this.state.location.display_name.split(',')[0]}</Card.Header>
            <Card.Body>
              <img
                src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_KEY}&center=${this.state.location.lat},${this.state.location.lon}&zoom=9`} 
                alt="map"
                id="map-img"
              />
              <Card.Title>{this.state.location.display_name.split(',').slice(1, this.length)}</Card.Title>
              <Card.Text>
                Latitude: {this.state.location.lat} Longitude: {this.state.location.lat}
              </Card.Text>
            </Card.Body>
          </Card>
        }
      </div>
    );
  }
}

export default App;
