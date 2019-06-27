import React, { Component } from 'react';
import axios from 'axios';

export default class Create extends Component {
  state = {
    name: '',
    price: '',
    imageUrl: 'https://placedog.net/500',
    description: '',
    shipping: ''
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  createItem = e => {
    e.preventDefault();
    console.log(this.state);

    const { name, price, imageUrl, description, shipping } = this.state;
    const payload = { name, price, imageUrl, description, shipping };

    axios
      .post('http://localhost:3333/items', payload)
      .then(response => {
        console.log(response);
        this.props.updateItems(response.data);

        this.setState({
          errorMessage: null
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          errorMessage: err.response.data.error
        });
      });
  };

  render() {
    const {
      name,
      price,
      imageUrl,
      description,
      shipping,
      errorMessage
    } = this.state;

    return (
      <form onSubmit={this.createItem}>
        <h1>Create New Trinket</h1>

        <p>{errorMessage}</p>
        <input
          type='text'
          name='name'
          placeholder='Name'
          value={name}
          onChange={this.handleChange}
        />
        <input
          type='number'
          name='price'
          placeholder='Price'
          value={price}
          onChange={this.handleChange}
        />
        <input
          type='text'
          name='imageUrl'
          placeholder='Image URL'
          value={imageUrl}
          onChange={this.handleChange}
        />
        <input
          type='description'
          name='description'
          placeholder='Description'
          value={description}
          onChange={this.handleChange}
        />
        <input
          type='shipping'
          name='shipping'
          placeholder='Shipping'
          value={shipping}
          onChange={this.handleChange}
        />

        <button type='submit'>Create</button>
      </form>
    );
  }
}
