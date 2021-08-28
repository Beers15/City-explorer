import React, { Component } from 'react';
import Restaurant from './Restaurant';
import Card from 'react-bootstrap/Card';

class Restaurants extends Component {
  render() {
    return (
      <div>
        {this.props.restaurants && this.props.restaurants.map((restaurant, idx) => {
          return (
            <Restaurant
              useHeader={idx === 0 ? true : false}
              image_url={restaurant.image_url}
              name={restaurant.name}
              rating={restaurant.rating}
              price={restaurant.price}
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

export default Restaurants;
