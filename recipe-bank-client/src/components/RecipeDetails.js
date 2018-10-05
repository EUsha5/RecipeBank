import React, { Component } from 'react';
import axios from 'axios';
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
        <h2> The Blah </h2>
        <h1>{this.state.name}</h1>
        <p>{this.state.ingrediants}</p>
        <p>{this.state.instructions}</p>
        <button onClick={() => this.deleteRecipe()}>Delete Recipe</button>

      </div>
    )
  }
}

export default RecipeDetails;