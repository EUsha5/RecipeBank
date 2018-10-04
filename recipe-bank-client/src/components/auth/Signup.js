import React, {Component} from 'react';
import AuthService from './auth-services';
import { Link } from 'react-router-dom';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {username: '', password: '', firstname: '', lastname: '', company: ''};
    this.service = new AuthService();
  }
  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    const firstname = this.state.firstname;
    const lastname = this.state.lastname;
    const company = this.state.company;

    this.service.signup(username, password)
    .then( theUser => {
        this.setState({
            username: "", 
            password: "",
            firstname: "",
            lastname: "",
            company: "",
        });
        this.props.setTheUser(theUser)
    })
    .catch( error => console.log(error))
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

          <label>First Name:</label>
          <input type="text" name="firstname" value={this.state.firstname} onChange={ e => this.handleChange(e)}/>

          <label>Last Name:</label>
          <input type="text" name="lastname" value={this.state.lastname} onChange={ e => this.handleChange(e)}/>
          
          <label>Password:</label>
          <input type="text" name="password" value={this.state.password} onChange={ e => this.handleChange(e)} />

          {/* <label>Role:</label>
          <select value="Chef Sous Cook" name="role" /> */}

          <label>Company:</label>
          <input type="text" name="company" value={this.state.company} onChange={e=>this.handleChange(e)} />
          
          <input type="submit" value="Signup" />
        </form>

        <p>Already have account? 
            <Link to={"/"}> Login</Link>
        </p>

      </div>
    )
  }
}

export default Signup;
