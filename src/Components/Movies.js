import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';

class Movies extends Component {
  render() {
    return (
      <Card bg="dark" border="warning" className="app-card">
        <Card.Header className="app-card-header">Movies</Card.Header>
        <Card.Body>
          {this.props.movies && this.props.movies.map((movie, idx) => {
            return (
              <>
                <img src={movie.image_url} alt={movie.title}></img>
                <Card.Text className="card-txt" key={idx}>{movie.title}</Card.Text>
              </>
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

export default Movies;
