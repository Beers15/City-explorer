import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';

class Weather extends Component {
  render() {
    return (
      <Card bg="success" border="warning" className="app-card">
        <Card.Header className="app-card-header">{this.props.location.split(',')[0] + '\'s weather forecasts'}</Card.Header>
        <Card.Body>
          <Card.Title>{}</Card.Title>
          <Card.Text className="forecast-txt">
            {this.props.weather && this.props.weather.map((forecast) => {
              return (
                <>
                  <h3>Date: {forecast.date} &nbsp;~~&nbsp; Weather: {forecast.description}</h3>
                  <br />
                </>
              );
            })}
            {this.props.error &&
              <h2>{this.props.error}</h2>
            }
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default Weather;
