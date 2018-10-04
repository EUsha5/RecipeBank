import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import AddRecipe from './AddRecipe';


class RecipeList extends Component {
  constructor(){
    super();
    this.state={listOfRecipes: []};
  }
  
  getAllRecipes = () => {
    axios.get(`http://localhost:5000/api/recipes`, {withCredentials:true})
    .then(responseFromApi => {
      this.setState({
        listOfRecipes: responseFromApi.data
      })
    })
    .catch((err) => {
      console.log(err)
    })
  }
  
  componentDidMount() {
    this.getAllRecipes();
  }
  
  render(){
    console.log('><><<><<><><><><><>', this.state.listOfRecipes)
    return(
      <div>
        <div>
          {this.state.listOfRecipes.map((recipe, index) => {
            return (
              <div key={recipe._id}>
                <Link to={`/recipes/${recipe._id}`}>
                  <h3>{recipe.name}</h3>
                </Link>
              </div>
            )})
          }
        </div>
        <div>
        <Link to='/recipes/create'>
                <button>Add Recipe</button>
              </Link>
            {/* <AddRecipe getData={() => this.getAllRecipes()}/> */}
        </div>
      </div>
    )
  }
}

export default RecipeList;