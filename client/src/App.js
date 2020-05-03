import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import setAuthToken from "./utils/setAuthToken";

//Auth
import Register from "../src/components/auth/Register";
import Login from "../src/components/auth/Login";
import SuccessMessage from "../src/components/auth/SuccessMessage";

//Layout
import Header from "../src/components/layout/header/Header";

import Landing from "../src/components/layout/main/Landing";
import Footer from "../src/components/layout/footer/Footer";
//Project
import Project from "../src/components/layout/project/Project";
import ProjectCreate from "../src/components/layout/project/ProjectCreate";
import ProjectEdit from "../src/components/layout/project/ProjectEdit";
//Employees
import EmployeeStaff from "../src/components/layout/employee/EmployeeStaff";
import EmployeeAdd from "../src/components/layout/employee/EmployeeAdd";
import EmployeeDetails from "../src/components/layout/employee/EmployeeDetails";
import EmployeeEdit from "../src/components/layout/employee/EmployeeEdit";
import ActivationConfirmation from "../src/components/layout/employee/ActivationConfirmation";
//Admin
import AdminControl from "./components/layout/admin/AdminControl";
import AdminContactForm from "./components/layout/admin/AdminContactForm";

import configureStore from "./store/configureStore/configureStore";
import jwt_decode from "jwt-decode";
import { setCurrentUser, clearOutUser } from "./store/actions/authAction";
// Redux-Auth-Wrapper
import {
  userIsAuthenticated,
  userIsNotAuthenticated,
} from "./utils/reduxAuthWrapper";

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
    phone: decoded.phone,
  };
  store.dispatch(setCurrentUser(dataToRedux));

  //check for expiration token
  const currentTime = Date.now() / 1000;
  // console.log("date now", currentTime);
  // console.log("decoded.exp", decoded.exp);
  // console.log(currentTime - decoded.exp);

  if (decoded.exp < currentTime) {
    console.log("clear user");

    //Logout User
    store.dispatch(clearOutUser());
    localStorage.removeItem("jwtToken");
    //Redirect to Home
  }
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className={window.innerWidth < 1700 ? "" : "container"}>
            <Header />
            <Switch>
              <Route
                exact
                path="/project"
                component={userIsAuthenticated(Project)}
              />
              <Route
                exact
                path="/create_project"
                component={userIsAuthenticated(ProjectCreate)}
              />
              <Route
                exact
                path="/edit_project/:id"
                component={userIsAuthenticated(ProjectEdit)}
              />
              <Route
                exact
                path="/employees/:id"
                component={userIsAuthenticated(EmployeeStaff)}
              />
              <Route
                exact
                path="/employee_add/:id"
                component={userIsAuthenticated(EmployeeAdd)}
              />
              <Route
                exact
                path="/employee_details/:id"
                component={userIsAuthenticated(EmployeeDetails)}
              />
              <Route
                exact
                path="/employee_edit/:id"
                component={userIsAuthenticated(EmployeeEdit)}
              />

              <Route exact path="/register" component={Register} />
              <Route
                exact
                path="/login"
                component={userIsNotAuthenticated(Login)}
              />
              <Route exact path="/" component={Landing} />
              <Route exact path="/admin_contact" component={AdminContactForm} />
              <Route
                exact
                path="/confirm/:id/:token"
                component={SuccessMessage}
              />
              <Route
                exact
                path="/activate/:uid/:projectID/"
                component={ActivationConfirmation}
              />

              <Route
                exact
                path="/admin/:token/:access"
                component={AdminControl}
              />
            </Switch>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
