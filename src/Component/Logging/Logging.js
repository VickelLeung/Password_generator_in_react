import React, { Component } from 'react';
import fire from './../fire';
import Button from '../UI/Button/Button';
import Rodal from 'rodal';
import rodal from 'rodal';

class Logging extends Component {

    state = {
        email: "",
        password: "",
        isSignedIn: false,

        visible: false
    }

    //fetch from firebase the password -> email
    componentDidMount = () => {

    }

    updateInput = (event, type) => {
        //overwrite and prevent default function
        event.preventDefault();
        let content = event.target.value;
        console.log("event" + content);
        switch (type) {
            case 'email':
                this.setState({ email: content });
                break;
            case 'password':
                this.setState({ password: content });
                break;
            default:
                return;
        }
        console.log("pass:" + this.state.password + " email:" + this.state.email);

    }

    login = (e) => {
        // e.preventDefault();
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((u) => {
                console.log("loggedIn");
                this.setState({ isSignedIn: true })
            })
            .catch((error) => {
                console.log(error);
                alert("error no user");
            })
    }

    register = (event) => {
        // event.preventDefault();
        fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then((u) => {

            }).catch((error) => {
                console.log("error with registration")
            })
    }

    switchAuthModeHandler = () => {

    }

    show = () => {
        this.setState({ visible: true });
    }

    hide = () => {
        this.setState({ visible: false });
    }

    render() {

        let showLoginRodal = "";

        if (this.state.isSignedIn)
            showLoginRodal = <Rodal visible={this.state.visible} onClose={this.hide}>
                <div>
                    <h2>Signin successfully</h2>
                </div>
            </Rodal>


        return (


            <div>
                <h2>{this.state.isSignedIn ? "Registration" : "Login"}</h2>

                <input onChange={(event) => this.updateInput(event, 'email')} placeholder="Email"></input>
                <input onChange={(event) => this.updateInput(event, 'password')} placeholder="Password"></input>
                <Button click={this.login}>Submit</Button>
                {showLoginRodal}
                <br />
                <Button click={this.register}>register</Button>
                {/* <div>
                    <Button clicked={this.switchAuthModeHandler} btnType="Danger">Switch to {this.state.isSignedIn ? "Signin" : "Signup"}</Button>
                </div> */}
                <p>Email: {this.state.email}</p>
                <p>pass: {this.state.password}</p>
            </div>
        )
    }

}

export default Logging;