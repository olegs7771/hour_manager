import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { Provider } from "react-redux";
import setAuthToken from "./utils/setAuthToken";

//Auth
import Register from "../src/components/auth/Register";
import Login from "../src/components/auth/Login";
//Layout
import Header from "../src/components/layout/header/Header";
import Home from "../src/components/layout/main/Home";
//Project
import Project from "../src/components/layout/project/Project";
import ProjectCreate from "../src/components/layout/project/ProjectCreate";

import configureStore from "./store/configureStore/configureStore";
import jwt_decode from "jwt-decode";
import { setCurrentUser, clearOutUser } from "./store/actions/authAction";

import "./App.css";
const store = configureStore();

//Check for token in localStorage
if (localStorage.jwtToken) {
  //Set token in header request
  setAuthToken(localStorage.jwtToken);
  //decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  //set currentUser to auth.user in redux state and  Authenticate
  const dataToRedux = {
    id: decoded.id,
    email: decoded.email,
    name: decoded.name,
    phone: decoded.phone
  };
  store.dispatch(setCurrentUser(dataToRedux));

  //check for expiration token
  const currentTime = Date.now() / 1000;
  // console.log("date now", currentTime);
  // console.log("decoded.exp", decoded.exp);
  // console.log(currentTime - decoded.exp);

  if (decoded.exp < currentTime) {
    // console.log("clear user");

    //Logout User
    store.dispatch(clearOutUser());
    localStorage.removeItem("jwtToken");
    //Redirect to Home
  }
}
console.log("location", window.location);

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="container">
            <Header />
            <Switch>
              <Route exact path="/project">
                {!localStorage.jwtToken ? (
                  <Redirect to="/login" />
                ) : (
                  <Project />
                )}
              </Route>
              <Route exact path="/create_project">
                {!localStorage.jwtToken ? (
                  <Redirect to="/login" />
                ) : (
                  <ProjectCreate />
                )}
              </Route>

              <Route exact path="/" component={Home} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
