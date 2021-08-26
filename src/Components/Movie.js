import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';

class Movie extends Component {
  render() {
    return (
      <Card
        bg="dark"
        text="white"
        className="mt-3 movie-card"
        border="success"
      >
        {this.props.useHeader &&
          <Card.Header className="main-header">Movies</Card.Header>
        }
        <Card.Img variant="top" src={this.props.image_url} />
        <Card.Body>
          <Card.Title>{this.props.title}</Card.Title>
          <Card.Text>
            {this.props.overview}
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default Movie;
