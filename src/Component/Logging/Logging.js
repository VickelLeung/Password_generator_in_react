import React, { Component } from 'react';
import firebase from 'firebase';
import Button from '../UI/Button/Button';
import Rodal from 'rodal';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import { Redirect } from 'react-router-dom';


// if (!firebase.apps.length) {
//     firebase.initializeApp({
//         apiKey: process.env.REACT_APP_API_KEY,
//         authDomain: "password-generator-db07b.firebaseapp.com"
//     })
// }


class Logging extends Component {

    state = {
        // email: "",
        // password: "",
        isSignedIn: false,
        visible: true,
    }
    uiConfig = {
        signInFlow: "popup",
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        callbacks: {
            signInSuccess: () => false
        }
    }

    //fetch from firebase the password -> email
    componentDidMount = () => {
        firebase.auth().onAuthStateChanged(user => {
            this.setState({ isSignedIn: !user })
            console.log("user", user)
        })
    }

    // updateInput = (event, type) => {
    //     //overwrite and prevent default function
    //     event.preventDefault();
    //     let content = event.target.value;
    //     console.log("event" + content);
    //     switch (type) {
    //         case 'email':
    //             this.setState({ email: content });
    //             break;
    //         case 'password':
    //             this.setState({ password: content });
    //             break;
    //         default:
    //             return;
    //     }
    //     console.log("pass:" + this.state.password + " email:" + this.state.email);

    // }

    // login = (e) => {
    // e.preventDefault();
    // var user = fire.auth.currentUser;
    // console.log("user1:" + user);
    // if (!this.state.isSignedIn) {
    //     fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    //         .then((u) => {
    //             console.log("loggedIn");
    //             this.setState({ isSignedIn: true });
    //             console.log(this.state.isSignedIn);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //             alert("error no user");
    //         })
    // }
    // else
    //     console.log("already sign in")

    // var str = fire.auth().currentUser.email;
    // console.log("user: " + str);
    // }

    // register = (event) => {
    // event.preventDefault();
    // fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    // .then((u) => {

    // }).catch((error) => {
    // console.log("error with registration")
    // })
    // }

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
                    <h2>Signin successfully!</h2>
                    <h3>Welcome {firebase.auth().currentUser.displayName}</h3>
                </div>
            </Rodal>


        return (


            <div>
                <h2>{this.state.isSignedIn ? "Registration" : "Login"}</h2>
                {/* 
                <input onChange={(event) => this.updateInput(event, 'email')} placeholder="Email"></input>
                <input type="password" onChange={(event) => this.updateInput(event, 'password')} placeholder="Password"></input> */}

                <div>
                    {/* <Button click={this.login}>Login</Button>
                    {showLoginRodal}

                    <Button click={this.register}>register</Button> */}
                    {showLoginRodal}
                    <StyledFirebaseAuth
                        uiConfig={this.uiConfig}
                        firebaseAuth={firebase.auth()}
                    />

                </div>

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