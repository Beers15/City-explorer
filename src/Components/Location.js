import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';

class Location extends Component {
  render() {
    return (
      <div>
        <Card bg="dark" border="warning" className="app-card">
          <Card.Header className="app-card-header">{this.props.location.display_name.split(',')[0]}</Card.Header>
          <Card.Body>
            <img
              src={this.props.mapSrc}
              alt="map"
              id="map-img"
            />
            <Card.Title id="result-title">{this.props.location.display_name.split(',').slice(1, this.length)}</Card.Title>
            <Card.Text id="coord-result-text">
              Latitude: {this.props.location.lat} Longitude: {this.props.location.lat}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default Location;
