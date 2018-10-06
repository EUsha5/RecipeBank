// auth/Login.js

import React, {Component} from 'react';
import AuthService from './auth-services';
import {Link} from 'react-router-dom' 

class Login extends Component {
  constructor(props){
    super(props);
    this.state = { username: '', password: ''};// loggedInUser: null
    this.service = new AuthService();
  }

  handleFormSubmit = (event) => {
    console.log("submitting form data for user log in <<<<<<<<<<<<<<<<<<<<");
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
  
    this.service.login(username, password)
    .then( response => {
      console.log(response);
      console.log('********************', this.state.password);
      console.log("the response after logging in ^^^^^^^^^^^^^^^^^^^^^^^ ", response);
        this.setState({
            username: "", 
            password: "",
            // loggedInUser: response
        });
        console.log('=-=-=-=-=-=-==-=-', response)
        this.props.setTheUser(response)
    })
    .catch( error => console.log(error) )
  }
  
  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }
      
  
  render(){
    return(
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <label>Username:</label>
          <input type="text" name="username" value={this.state.username} onChange={ e => this.handleChange(e)}/>
          
          <label>Password:</label>
          <input name="password" value={this.state.password} onChange={ e => this.handleChange(e)} />
          
          <input type="submit" value="Login" />
        </form>
  
        <p>Don't have an account? 
            <Link to={"/signup"}> Signup</Link>
        </p>
  
      </div>
    )
  }
}
export default Login;
