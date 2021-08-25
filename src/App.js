import './App.css';
import { Component } from 'react';
import SearchForm from './Components/SearchForm';
import ResultsDisplay from './Components/ResultsDisplay';
import Weather from './Components/Weather';
import axios from 'axios';
import CardGroup from 'react-bootstrap/CardGroup';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: {},
      error: '',
      weather: [],
      weatherErr: null,
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

  getWeather = async (searchQuery) => {
    this.setState({weatherErr: null});

    let API = `http://localhost:3001/weather?lat=${this.state.location.lat}&lon=${this.state.location.lon}&searchQuery=${searchQuery}`;

    try {
      const res = await axios.get(API);
      if(res.data.error) {
        console.log(res.data);
        this.setState({
          weatherErr: res.data.error,
          weather: [],
        });
        return;
      }
      this.setState({weather: res.data.forecasts});
      console.log(this.state.weather);
    } catch(err) {
      this.setState({error: 'Status Code ' + err.response.status + ': ' + err.response.data.error
                     + '. Please Modify your query and try again.'});
    }
  }

  getData = async (searchQuery) => {
    await this.getLocation(searchQuery);
    this.getWeather(searchQuery);
  }

  render() {
    return (
      <>
        <SearchForm getSearchQuery={this.getData} />

        {this.state.error && <p id="error-txt">{this.state.error}</p>}

        {(this.state.location.lon && this.state.location.lat) &&
          <CardGroup>
            <ResultsDisplay
              mapSrc={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_KEY}&center=${this.state.location.lat},${this.state.location.lon}&zoom=9`}
              location={this.state.location}
            />
            <Weather weather={this.state.weather} error={this.state.weatherErr} location={this.state.location.display_name} />
          </CardGroup>
        }
      </>
    );
  }
}

export default App;
