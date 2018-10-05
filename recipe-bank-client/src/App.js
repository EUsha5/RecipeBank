import React, { Component } from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import Signup from './components/auth/Signup';
import Navbar from './components/Navbar';
import AuthService from './components/auth/auth-services';
import Login from './components/auth/Login';
import RecipeList from './components/RecipeList';
import AddRecipe from './components/AddRecipe';
import RecipeDetails from './components/RecipeDetails';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {loggedInUser: null};
    this.service = new AuthService();
  }

  fetchUser(){
    if( this.state.loggedInUser === null ){
      this.service.loggedin()
      .then(response =>{
        this.setState({
          loggedInUser:  response
        }) 
      })
      .catch( err =>{
        this.setState({
          loggedInUser:  false
        }) 
      })
    }
  }

  getTheUser = (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }

  render() {
    this.fetchUser();
    return (
      <div className="App">
       <Navbar setTheUser={this.getTheUser} userInSession={this.state.loggedInUser} />
       <Switch>
        <Route exact path="/signup" render={() =><Signup setTheUser={this.getTheUser}/>}/>
        <Route exact path='/' render={() => <Login setTheUser={this.getTheUser}/>}/>
        <Route exact path="/recipes" component={RecipeList}/>
        <Route exact path="/recipes/:id" component={RecipeDetails} />
        {/* <Route exact path="/recipes/create" component={AddRecipe} /> */}
       </Switch>
      </div>
    );
  }
}

export default App;
