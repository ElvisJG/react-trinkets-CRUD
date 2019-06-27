import React, { Component } from 'react';
import Axios from 'axios';

export default class Edit extends Component {
  state = {
    name: '',
    price: '',
    imageUrl: 'https://placedog.net/500',
    description: '',
    shipping: ''
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    Axios.get(`http://localhost:3333/items/${id}`)
      .then(response => {
        const { name, price, imageUrl, description, shipping } = response.data;
        this.setState({ name, price, imageUrl, description, shipping });
      })
      .catch(err => {
        this.setState({
          errorMessage: err.response.data.error
        });
      });
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  updateItem = e => {
    e.preventDefault();

    const { name, price, imageUrl, description, shipping } = this.state;
    const payload = { name, price, imageUrl, description, shipping };
    const id = this.props.match.params.id;

    Axios.put(`http://localhost:3333/items/${id}`, payload)
      .then(response => {
        this.props.updateItems(response.data);

        this.setState({
          errorMessage: null
        });

        this.props.history.push('/trinkets');
      })
      .catch(err => {
        this.setState({
          errorMessage: err.response.data.error
        });
      });
  };

  deleteItem = e => {
    e.preventDefault();

    const id = this.props.match.params.id;

    Axios.delete(`http://localhost:3333/items/${id}`)
      .then(response => {
        this.props.updateItems(response.data);

        this.setState({
          errorMessage: null
        });
        this.props.history.push('/trinkets');
      })
      .catch(err => {
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
      <form onSubmit={this.updateItem}>
        <h1>Edit Trinket</h1>

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

        <button type='submit'>Edit</button>
        <button onClick={this.deleteItem}>Delete</button>
      </form>
    );
  }
}
