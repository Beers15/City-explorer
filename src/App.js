import './App.css';
import { Component } from 'react';
import SearchForm from './Components/SearchForm';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: {},
      error: '',
    };
  }

  getLocation = async (q) => {
    const API = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_KEY}&q=${q}&format=json`;

    try {
      const res = await axios.get(API);
      console.log(res.data[0]);
      this.setState({location: res.data[0]});
    } catch(err) {
      console.log(err.response.data.error);
      this.setState({error: 'Error ' + err.response.status + ': ' + err.response.data.error 
                     + '. Please Modify your query and try again.'});
    }
  }

  render() {
    return (
      <div className="App">
        <h1>Location Info</h1>
        <SearchForm getSearchQuery={this.getLocation} />
        {this.state.location.lat &&
          <h2>Latitude: {this.state.location.lat} Longitude: {this.state.location.lat}</h2>
        }
        {this.state.error &&
          <>
            <p className="error-txt">{this.state.error}</p>
          </>
        }
      </div>
    );
  }
}

export default App;
