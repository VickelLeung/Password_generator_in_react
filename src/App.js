import React, { Component } from 'react';
import GeneratePassword from './Component/GeneratePassword/GeneratePassword';
import HomePage from './Component/Homepage/Homepage';
import Logging from './Component/Logging/Logging';
import Manage from './Component/Manage/Manage';
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom'
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <NavLink className="link" to="/logging">Logging/Registration</NavLink>
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
      </BrowserRouter>
    );
  }
}

export default App;
