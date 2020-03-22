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
import SuccessMessage from "../src/components/auth/SuccessMessage";

//Layout
import Header from "../src/components/layout/header/Header";
import Home from "../src/components/layout/main/Home";
import Landing from "../src/components/layout/main/Landing";
//Project
import Project from "../src/components/layout/project/Project";
import ProjectCreate from "../src/components/layout/project/ProjectCreate";
import ProjectEdit from "../src/components/layout/project/ProjectEdit";
//Employees
import EmployeeStaff from "../src/components/layout/employee/EmployeeStaff";
import EmployeeAdd from "../src/components/layout/employee/EmployeeAdd";
import EmployeeDetails from "../src/components/layout/employee/EmployeeDetails";
import EmployeeEdit from "../src/components/layout/employee/EmployeeEdit";
import ActivationSuccessMessage from "../src/components/layout/employee/ActivationSuccessMessage";

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
// console.log("location", window.location);

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
              <Route exact path="/edit_project/:id">
                {!localStorage.jwtToken ? (
                  <Redirect to="/login" />
                ) : (
                  <ProjectEdit />
                )}
              </Route>
              <Route exact path="/employees/:id">
                {!localStorage.jwtToken ? (
                  <Redirect to="/login" />
                ) : (
                  <EmployeeStaff />
                )}
              </Route>
              <Route exact path="/employee_add/:id">
                {!localStorage.jwtToken ? (
                  <Redirect to="/login" />
                ) : (
                  <EmployeeAdd />
                )}
              </Route>
              <Route exact path="/employee_details/:id">
                {!localStorage.jwtToken ? (
                  <Redirect to="/login" />
                ) : (
                  <EmployeeDetails />
                )}
              </Route>
              <Route exact path="/employee_edit/:id">
                {!localStorage.jwtToken ? (
                  <Redirect to="/login" />
                ) : (
                  <EmployeeEdit />
                )}
              </Route>

              <Route exact path="/home" component={Home} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/" component={Landing} />
              <Route
                exact
                path="/confirm/:id/:token"
                component={SuccessMessage}
              />
              <Route
                exact
                path="/emp_activ_msg/:id/:projectID/:email"
                component={ActivationSuccessMessage}
              />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
