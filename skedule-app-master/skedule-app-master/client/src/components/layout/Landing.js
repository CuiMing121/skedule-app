import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Landing extends Component {
  
  render(){
    return(
      <div className = "landing">
        <div className = " landing-inner text-light">
          <div className = "container">
            <div className = "row">
              <div className = "col-md-12 text-center">
                <h1 className = "display-3 mb-4">  
                  21st Century Joint Venture                
                </h1>
                <p className = "lead">
                  Welcome to visit Our Site, please Login......
                </p>
                <hr />
                <Link to = "/register" className = "btn btn-lg btn-info mr-2">
                  Sign Up
                </Link>
                <Link to = "/login" className = "btn btn-lg btn-light">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Landing;

