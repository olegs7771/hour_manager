import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import setAuthToken from "./utils/setAuthToken";

//Auth
import Register from "../src/components/auth/Register";
import Login from "../src/components/auth/Login";
//Layout
import Header from "../src/components/layout/header/Header";
import Home from "../src/components/layout/main/Home";
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
  if (decoded.exp < currentTime) {
    //Logout User
    store.dispatch(clearOutUser());
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="container">
            <Header />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/" component={Home} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
