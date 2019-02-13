import React, { Component } from 'react';
import GeneratePassword from './Component/GeneratePassword/GeneratePassword';
import HomePage from './Component/Homepage/Homepage';
import Logging from './Component/Logging/Logging';
import Manage from './Component/Manage/Manage';
import NavBar from './Component/Header/Header';
import fire from './Component/fire';

import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom'
import './App.css';

class App extends Component {

  state = {
    user: null
  }

  componentDidMount() {
    this.authListener();
  }

  authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      // console.log(user);
      if (user) {
        this.setState({ user });
        localStorage.setItem('user', user.uid);
      }
      else {
        this.setState({ user: null });
        localStorage.removeItem('user');
      }
    })
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <div className="navBar">
            <NavBar />
          </div>

          <div className="content">
            <Switch>
              <Route path="/logging" component={Logging} />
              <Route path="/user-information" component={Manage} />
              <Route path="/generate-password" exact component={GeneratePassword} />

              {/* <Route path="/encryption" /> */}
              {/* <Route path="/generate-password" exact component={GeneratePassword} /> */}
              <Route path="/login" />
              <Route path="/" exact component={HomePage} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
