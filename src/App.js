import React, { Component } from 'react';
import GeneratePassword from './Component/GeneratePassword/GeneratePassword';
import HomePage from './Component/Homepage/Homepage';
import Logging from './Component/Logging/Logging';
import Manage from './Component/Manage/Manage';
import NavBar from './Component/Header/Header';
import Button from './Component/UI/Button/Button';
import firebase from 'firebase';

import "@fortawesome/fontawesome-free/css/all.min.css";
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom'
import './App.css';

class App extends Component {

  state = {
    isLogged: false
  }

  componentDidMount() {

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        let uid = firebase.auth().currentUser.uid;
        console.log("uid: " + uid);
        this.setState({
          isLogged: true
        })
      } else {
        console.log("User isn't login");
        this.setState({ isLogged: false })
      }
    })
  }

  logout = () => {
    firebase.auth().signOut();

  }

  render() {

    let displayLogComponent = "";
    let displayLogLink = "";
    let displayLogout = "";
    let displayUserRoute = "";

    if (!this.state.isLogged) {
      displayLogLink = <NavBar />

    }
    else {
      displayLogLink = (
        <div>
          <Button type="secondary">
            <NavLink to="/user-information">View saved data</NavLink>
          </Button>
          <Button type="secondary" >
            <NavLink to="/generate-password">Generate password</NavLink>
          </Button>
          <Button type="secondary" click={() => firebase.auth().signOut()}>Sign out!</Button>
        </div >)

      displayUserRoute = <Route path="/user-information" component={Manage} />
    }

    displayLogComponent = <Route path="/logging" component={Logging} />

    return (
      <BrowserRouter>
        <div className="App">
          <div className="navBar">
            {displayLogLink}
          </div>

          <div className="content">

            <Switch>
              {displayLogComponent}
              <Route path="/generate-password" exact component={GeneratePassword} />
              <Route path="/" exact component={HomePage} />
              {displayUserRoute}
              <Route render={() => <h1>Error, page not found error 404</h1>} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
