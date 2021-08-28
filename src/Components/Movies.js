import React, { Component } from 'react';
import Movie from './Movie';
import Card from 'react-bootstrap/Card';

class Movies extends Component {
  render() {
    return (
      <div>
        {this.props.movies && this.props.movies.map((movie, idx) => {
          return (
            <Movie
              useHeader={idx === 0 ? true : false}
              image_url={movie.image_url}
              title={movie.title} overview={movie.overview}
              key={idx}
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

export default Movies;
