import './App.css';
import { Component } from 'react';
import SearchForm from './Components/SearchForm';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { location: {} };
  }

  getCoords = async (q) => {
    const API = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_KEY}&q=${q}&format=json`;
    const res = await axios.get(API);
    console.log(res.data[0]);
    this.setState({location: res.data[0]});
  }

  getSearchQuery = (searchQuery) => {
    console.log(process.env.REACT_APP_KEY);
    this.getCoords(searchQuery);
  }

  render() {
    return (
      <div className="App">
        <h1>Location Info</h1>
        <SearchForm getSearchQuery={this.getSearchQuery} />
        {this.state.location.lat &&
          <h2>Latitude: {this.state.location.lat} Longitude: {this.state.location.lat}</h2>
        }
      </div>
    );
  }
}

export default App;
