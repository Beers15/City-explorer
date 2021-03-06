import React, { Component } from 'react';
import Forecast from './Forecast';
import Card from 'react-bootstrap/Card';

class Weather extends Component {
  render() {
    return (
      <div>
        {this.props.weather && this.props.weather.map((forecast, idx) => {
          return (
            <Forecast
              useHeader={idx === 0 ? true : false}
              date={forecast.date}
              description={forecast.description}
              id={idx}
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
