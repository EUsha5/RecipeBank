import React, { Component } from 'react';
import axios from 'axios';
// import Login from './auth/Login';

class AddRecipe extends Component {
  constructor(props) {
    super(props)
    this.state= {
      name: '',
      instructions: '',
      ingrediants: '',
      image: '',
      preptime: ''
    }
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const {name,instructions, ingrediants, image, preptime} = this.state;
    axios.post("http://localhost:5000/api/recipes/create", {name,instructions, image, ingrediants, preptime}, {withCredentials:true})
    .then(() => {
      this.props.getData();
      this.setState({
        name: '',
        instructions: '',
        ingrediants: '',
        image: '',
        preptime: ''
    })
    })
    .catch((err) => {
      console.log(err);
    })
  }

  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render(){
    return(
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <label>Name:</label>
          <input type="text" name="name" value={this.state.name} onChange={e => this.handleChange(e)}/>
          <label>Instructions:</label>
          <textarea name="instructions" value={this.state.instructions} onChange={e => this.handleChange(e)}></textarea>
          <label>Ingrediants:</label>
          <textarea name="ingrediants" value={this.state.ingrediants} onChange={e => this.handleChange(e)}></textarea>
          <label>Preptime:</label>
          <input type="number" name="preptime" value={this.state.preptime} onChange={e => this.handleChange(e)} />
          <label>Image:</label>
          <input type="text" name="image" value={this.state.image} onChange={e => this.handleChange(e)} />
          
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default AddRecipe