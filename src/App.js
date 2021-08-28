import './App.css';
import { Component } from 'react';
import SearchForm from './Components/SearchForm';
import Location from './Components/Location';
import Movies from './Components/Movies';
import Weather from './Components/Weather';
import Restaurants from './Components/Restaurants';
import axios from 'axios';
import CardGroup from 'react-bootstrap/CardGroup';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: {},
      locationErr: '',
      weather: [],
      weatherErr: '',
      movies: [],
      movieErr: '',
      restaurants: [],
      restaurantsErr: '',
    };
  }

  getLocation = async (searchQuery) => {
    let API = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_KEY}&q=${searchQuery}&format=json`;
    let API2 = `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_KEY}&q=${searchQuery}&format=json`;
    await this.makeRequest(API, 'location');
    if(this.state.locationErr !== '')
      this.makeRequest(API2, 'location');
  }

  getWeather = async (searchQuery) => {
    this.setState({weatherErr: null});

    let API = `http://localhost:3001/weather?lat=${this.state.location.lat}&lon=${this.state.location.lon}&searchQuery=${searchQuery}`;
    //let API = `${process.env.REACT_APP_DEPLOYMENT_PATH}/weather?lat=${this.state.location.lat}&lon=${this.state.location.lon}&searchQuery=${searchQuery}`;
    this.makeRequest(API, 'weather');
  }

  getMovies = async (searchQuery) => {
    this.setState({movieErr: null});

    let API = `http://localhost:3001/movies?l&query=${searchQuery}`;
    //let API = `${process.env.REACT_APP_DEPLOYMENT_PATH}/movies?&query=${searchQuery}`;
    this.makeRequest(API, 'movies');
  }

  getRestaurants = async (searchQuery) => {
    this.setState({restaurantsErr: null});

    let API = `http://localhost:3001/yelp?&query=${searchQuery}`;
    //let API = `${process.env.REACT_APP_DEPLOYMENT_PATH}/yelp?&query=${searchQuery}`;
    this.makeRequest(API, 'restaurants');
  }

  makeRequest = async (API, stateToSet) => {
    //reset previous error state->display before making a request
    if(stateToSet === 'location') {
      if(this.state.locationErr !== '') {
        this.setState({locationErr: ''});
      }
    }

    try {
      const res = await axios.get(API);
      if(stateToSet === 'movies') {
        this.setState({movies: res.data.movies});
        console.log(res.data.movies);
      }
      else if(stateToSet === 'weather') {
        this.setState({weather: res.data.forecasts});
      }
      else if(stateToSet === 'restaurants') {
        this.setState({restaurants: res.data.restaurants});
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
      else if(stateToSet === 'restaurants') {
        this.setState({
          restaurantsErr: err.response.data.error,
          restaurants: [],
        });
      }
      else {
        this.setState({locationErr: 'Status Code ' + err.response.status + ': ' + err.response.data.error
                     + '. Please Modify your query and try again.'});
        this.setState({location: []});
      }
    }
  }

  getData = async (searchQuery) => {
    this.getLocation(searchQuery);
    this.getWeather(searchQuery);
    this.getMovies(searchQuery);
    this.getRestaurants(searchQuery);
  }

  render() {
    return (
      <>
        <SearchForm getSearchQuery={this.getData} />

        {this.state.locationErr && <p id="error-txt">{this.state.locationErr}</p>}

        {(this.state.location.lon && this.state.location.lat) &&
          <CardGroup className="card-container">
            <Location
              mapSrc={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_KEY}&center=${this.state.location.lat},${this.state.location.lon}&zoom=9`}
              location={this.state.location}
            />
            <Weather weather={this.state.weather} error={this.state.weatherErr} location={this.state.location.display_name} />
            <Movies movies={this.state.movies} error={this.state.movieErr} />
            <Restaurants restaurants={this.state.restaurants} error={this.state.restaurantsErr} />
          </CardGroup>
        }
      </>
    );
  }
}

export default App;
