import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';

class Forecast extends Component {
  render() {
    return (
      <Card
        bg="dark"
        text="white"
        className="m-2 forecast-card"
        border="info"
      >
        {this.props.useHeader &&
          <Card.Header className="main-header">Weather Forecasts</Card.Header>
        }
        <Card.Body>
          <Card.Title>{this.props.date}</Card.Title>
          <Card.Text>
            {this.props.description}
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default Forecast;
