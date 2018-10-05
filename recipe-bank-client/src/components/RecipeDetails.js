import React, { Component } from 'react';
import axios from 'axios';
import EditRecipe from './EditRecipe';
// import { Link } from 'react-router-dom';

class RecipeDetails extends Component {
  constructor(props) {
    super(props);
    this.state={};
    console.log('///////////////////////dfghmnbvdsfghnbvcdfghnbvcdfgtrertytrewqwertre324543dfvbnbgfdsdfgdsrt32rtfgfr45tgbtrfgtfr', this.state)
  }

  componentDidMount(){
    this.getSingleRecipe();
  }

  getSingleRecipe = () => {
    console.log('wethtbszegrbrdxrtdgsxfbvdxtrtfews')
    const {params} = this.props.match;
    axios.get(`http://localhost:5000/api/recipes/${params.id}`, {withCredentials: true})
    .then(responseFromApi => {
      console.log("this is the response after getting to the details page ----------------------------- ", responseFromApi);
      const theRecipe = responseFromApi.data;
      this.setState(theRecipe);
    })
    .catch((err) =>{
      console.log(err)
    })
  }

  renderEditForm = () => {
    if(!this.state.name){
      this.getSingleRecipe();
    } else {
      return <EditRecipe theRecipe={this.state} getRecipe={this.getSingleRecipe} {...this.props} />
    }
  }

  deleteRecipe = () => {
    const {params} = this.props.match;
    axios.delete(`http://localhost:5000/api/recipes/${params.id}`, {withCredentials: true})
    .then(responseFromApi => {
      this.props.history.push('/recipes');
    })
    .catch((err) => {
      console.log(err);
    })
  }


  render() {
    console.log('_=_=_=_=_=_=_=', this.state)
    return(
      <div>
        <button onClick={() => this.deleteRecipe()}>Delete Recipe</button>
        <h1>{this.state.name}</h1>
        <ul>
          <li>
          {this.state.ingrediants}
          </li>
        </ul>
        <h2>{this.state.instructions}</h2>
        <p>Preptime:{this.state.preptime}min</p>
        <hr />

        {this.renderEditForm()}
        

      </div>
    )
  }
}

export default RecipeDetails;