import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';

class Weather extends Component {
  render() {
    return (
      <Card bg="dark" border="warning" className="app-card">
        <Card.Header className="app-card-header">Weather forecast</Card.Header>
        <Card.Body>
          <Card.Title>{}</Card.Title>
          {this.props.weather && this.props.weather.map((forecast, idx) => {
            return (
              <Card.Text className="card-txt" key={idx}>Date: {forecast.date} &nbsp;~&nbsp; Weather: {forecast.description}</Card.Text>
            );
          })}
          {this.props.error &&
            <h2>{this.props.error}</h2>
          }
        </Card.Body>
      </Card>
    );
  }
}

export default Weather;
