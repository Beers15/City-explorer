import React, { Component } from 'react';
import Forecast from './Forecast';
import Card from 'react-bootstrap/Card';

class Weather extends Component {
  render() {
    return (
      <div>
        {this.props.weather &&
          <Card
            bg="dark"
            text="white"
            className="m-2 mt-3 forecast-card"
            border="info"
          >
            <Card.Header className="main-header">Weather Forecasts</Card.Header>
          </Card>
        }
        {this.props.weather && this.props.weather.map((forecast, idx) => {
          return (
            <Forecast
              date={forecast.date}
              description={forecast.description}
            />
          );
        })}
        {this.props.error &&
          <Card
            bg="dark"
            text="white"
            className="m-3 forecast-card"
            border="danger"
          >
            <Card.Body>
              <Card.Title>{this.props.error}</Card.Title>
            </Card.Body>
          </Card>
        }
      </div>
    );
  }
}

export default Weather;
