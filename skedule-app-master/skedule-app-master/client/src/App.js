import React from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { logoutUser, setCurrentUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';

import {Provider} from 'react-redux';
import store from './store';

import PrivateRoute from './components/common/PrivateRoute';

import Navbar from './components/layout/Navbar'; 
import Footer from './components/layout/Footer'; 
import Landing from './components/layout/Landing';
import Register from './components/auth/Register'; 
import Login from './components/auth/Login'; 
import EditProfile from './components/edit-profile/EditProfile';
import Profiles from './components/profiles/Profiles'; 
import Orders from  './components/orders/Orders';
import OrderAnswer from './components/orderanswer/Order'; 

import './App.css';
//Check for token
if (localStorage.jwtToken) {
  //Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  //Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  //Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  //Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //Logout user
    store.dispatch(logoutUser());
    //Clear current Profile
    store.dispatch(clearCurrentProfile());    
    //Redirect to login
    window.location.href = '/login';
  }
}

function App() {
  return (
    <Provider store = {store}>
      <Router >
        <div className="App">
          <Navbar />
            <Route exact path = "/" component = {Landing} />
            <div className="container">
              <Route exact path = "/register" component = {Register} />
              <Route exact path = "/login" component = {Login} />
              <Route exact path = "/order" component = {Orders} />
              <Switch>
                <PrivateRoute exact path = "/edit-profile" component = {EditProfile} />
              </Switch>
              <Switch>
                <PrivateRoute exact path = "/users" component = {Profiles} />
              </Switch>
              <Switch>
                <PrivateRoute exact path = "/orderanswer/:id" component = {OrderAnswer} />
              </Switch>
            </div>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
