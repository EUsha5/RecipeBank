import React, {Component} from 'react';
import axios from 'axios';

class EditRecipe extends Component{
  constructor(props) {
    super(props);
    this.state={
      name: this.props.theRecipe.name,
      instructions: this.props.theRecipe.instructions,
      ingrediants: this.props.theRecipe.ingrediants,
      image: this.props.theRecipe.image,
      preptime: this.props.theRecipe.preptime,
    }
  }

  handleFormSubmit = (event) => {
    const name = this.state.name;
    const ingrediants = this.state.ingrediants;
    const instructions = this.state.instructions;
    const preptime = this.state.preptime;
    const image = this.state.image;
    event.preventDefault();

    axios.put(`http://localhost:5000/api/recipes/${this.props.theRecipe._id}`, {name, ingrediants, instructions, preptime, image}, {withCredentials:true})
    .then(() => {
      this.props.getRecipe();
      this.props.history.push('/recipes');
    })
    .catch(error => 
      console.log(error)
    )
  }

  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  // handleNameChange = (event) => {
  //   this.setState({
  //     name: event.target.value,
  //   })
  // }

  // handleInstrucChange = (event) => {
  //   this.setState({
  //     instructions: event.target.value,
  //   })
  // }

  // handleIngredChange = (event) => {
  //   this.setState({
  //     ingrediants: event.target.value,
  //   })
  // }

  // handleImageChange = (event) => {
  //   this.setState({
  //     image: event.target.value,
  //   })
  // }

  // handlePrepChange = (event) => {
  //   this.setState({
  //     preptime: event.target.value
  //   })
  // }

  render(){
    return(
      <div>
        <h3>Edit form</h3>
        <form onSubmit={this.handleFormSubmit}>
          <label>Name:</label>
          <input type="text" name="name" value={this.state.name} onChange={e => this.handleChange(e)}/>
          <label>Instructions:</label>
          <textarea name="instructions" value={this.state.instructions} onChange={e => this.handleChange(e)}></textarea>
          <label>Ingrediants:</label>
          <textarea name="ingrediants" value={this.state.ingrediants} onChange={e => this.handleChange(e)}></textarea>
          <label>Image:</label>
          <input type="text" name="image" value={this.state.image} onChange={e => this.handleChange(e)}/>
          <label>Preptime:</label>
          <input type="text" name="preptime" value={this.state.preptime} onChange={e => this.handleChange(e)}/>
          
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}


export default EditRecipe;