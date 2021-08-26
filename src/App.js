import './App.css';
import { Component } from 'react';
import SearchForm from './Components/SearchForm';
import Location from './Components/Location';
import Movies from './Components/Movies';
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
      weatherErr: '',
      movieErr: '',
      movies: [],
    };
  }

  getLocation = async (searchQuery) => {
    let API = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_KEY}&q=${searchQuery}&format=json`;
    let API2 = `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_KEY}&q=${searchQuery}&format=json`;
    await this.makeRequest(API, 'location');
    if(this.state.error !== '')
      this.makeRequest(API2, 'location');
  }

  getWeather = async (searchQuery) => {
    this.setState({weatherErr: null});

    //let API = `http://localhost:3001/weather?lat=${this.state.location.lat}&lon=${this.state.location.lon}&searchQuery=${searchQuery}`;
    let API = `${process.env.REACT_APP_DEPLOYMENT_PATH}/weather?lat=${this.state.location.lat}&lon=${this.state.location.lon}&searchQuery=${searchQuery}`;
    await this.makeRequest(API, 'weather');
  }

  getMovies = async (searchQuery) => {
    this.setState({movieErr: null});

    //let API = `http://localhost:3001/movies?l&query=${searchQuery}`;
    let API = `${process.env.REACT_APP_DEPLOYMENT_PATH}/movies?l&query=${searchQuery}`;
    await this.makeRequest(API, 'movies');
  }

  makeRequest = async (API, stateToSet) => {
    //reset previous error state->display before making a request
    if(stateToSet === 'location') {
      if(this.state.error !== '') {
        this.setState({error: ''});
      }
    }

    try {
      const res = await axios.get(API);
      if(stateToSet === 'movies') {
        this.setState({movies: res.data.movies});
      }
      else if(stateToSet === 'weather') {
        this.setState({weather: res.data.forecasts});
      }
      else {
        this.setState({location: res.data[0]});
      }
    } catch(err) {
      if(stateToSet === 'movies') {
        this.setState({
          movieErr: err.response.data.error,
          movies: [],
        });
      }
      else if(stateToSet === 'weather') {
        this.setState({
          weatherErr: err.response.data.error,
          weather: [],
        });
      }
      else {
        this.setState({error: 'Status Code ' + err.response.status + ': ' + err.response.data.error
                     + '. Please Modify your query and try again.'});
      }
    }

  }

  getData = async (searchQuery) => {
    await this.getLocation(searchQuery);
    this.getWeather(searchQuery);
    this.getMovies(searchQuery);
  }

  render() {
    return (
      <>
        <SearchForm getSearchQuery={this.getData} />

        {this.state.error && <p id="error-txt">{this.state.error}</p>}

        {(this.state.location.lon && this.state.location.lat) &&
          <CardGroup className="card-container">
            <Location
              mapSrc={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_KEY}&center=${this.state.location.lat},${this.state.location.lon}&zoom=9`}
              location={this.state.location}
            />
            <Weather weather={this.state.weather} error={this.state.weatherErr} location={this.state.location.display_name} />
            <Movies movies={this.state.movies} error={this.state.movieErr} />
          </CardGroup>
        }
      </>
    );
  }
}

export default App;
