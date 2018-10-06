
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import AuthService from './auth/auth-services';


class Navbar extends Component {
  constructor(props){
    super(props);
    this.state = {loggedInUser: null};
    this.service = new AuthService();

  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({...this.state, loggedInUser: nextProps["userInSession"]})
  }


  logoutUser = () =>{
    this.service.logout()
    .then(() => {
      this.setState({ loggedInUser: null });
      this.props.setTheUser(null);  
    })
  }
    
  render(){
    if(this.state.loggedInUser){
      return(
        <nav className="navbar-logout">
          <ul>
            <li>Welcome, {this.state.loggedInUser.firstname}</li>
            <li>{this.state.loggedInUser.company}</li>
            <li><Link to='/recipes'>Recipes</Link></li>
            <li><Link to='/employees'>Employees</Link></li>

            <li>
              <Link to='/'>
                <button onClick={() => this.logoutUser()}>Logout</button>
              </Link>
            </li>
          </ul>
        </nav>
      )
    } else {
      return ( 
        <nav className="navbar-login">
          <ul>
            <li><Link to='/' style={{ textDecoration: 'none' }}>Login</Link></li>
            <li><Link to='/signup' style={{ textDecoration: 'none' }}>Signup</Link></li>
          </ul>
        </nav>
      )
    }
    }
  }
  export default Navbar;