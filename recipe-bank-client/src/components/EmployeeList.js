import React, { Component } from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';


class EmployeeList extends Component {
  constructor() {
    super();
    this.state={listOfEmployees: []};
  }

  getAllEmployees = () => {
    axios.get(`http://localhost:5000/api/employees`, {withCredentials: true})
    .then(responseFromApi => {
      console.log("fuuuuuuckkkkk my life @@@@@@@@@@@@@@@@@@ ", responseFromApi.data);
      this.setState({
        listOfCompanies: responseFromApi.data
      })
    })
    .catch((err) => {
      console.log(err)
    })
  }

  componentDidMount() {
    this.getAllEmployees();
  }



  // showEmployeesByCompany = () => {
  //   this.state.listOfCompanies.map((company, index) => {
  //     return (
       
  //     )
  //   })


  // }


  render() {
    console.log('<<<<<<<<<<<<<<<<<<<<<<', this.state.listOfCompanies)
    return(
      <div>
       
        {/* <div>
        <Link  to='/employees/create'>
                <button>Add employee</button>
              </Link>
            <Addemployee getData={() => this.getAllemployees()}/>
        </div> */}
      </div>
    )
  }
}

export default EmployeeList;