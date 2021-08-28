import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';

class Restaurant extends Component {
  render() {
    return (
      <Card
        bg="dark"
        text="white"
        className="m-3 restaurant-card"
        border="primary"
      >
        {this.props.useHeader &&
          <Card.Header className="main-header">Restaurants</Card.Header>
        }
        <Card.Img variant="top" src={this.props.image_url} />
        <Card.Body>
          <Card.Title>{this.props.name}</Card.Title>
          <Card.Text>
            Rating: {this.props.rating} &nbsp;&nbsp;&nbsp;Price: {this.props.price}
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default Restaurant;
