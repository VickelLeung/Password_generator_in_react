import React, { Component } from 'react';
import firebase from 'firebase';
import Button from '../UI/Button/Button';
import Rodal from 'rodal';
import { NavLink } from 'react-router-dom';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import anonymous from '../../images/anonymous.png';
import './Logging.css'


firebase.initializeApp({
    apiKey: "AIzaSyCmZJMPZjDi7K34uw5iQMmatD329f0TT3M",
    authDomain: "bodycheck-8d735.firebaseapp.com"
})

class Logging extends Component {


    state = { isSignedIn: false, visible: true }
    uiConfig = {
        signInFlow: "redirect",
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
            this.setState({ isSignedIn: !!user })
            // console.log("user", user)
        })
    }

    show = () => {
        this.setState({ visible: true });
    }

    hide = () => {
        this.setState({ visible: false });
    }

    test() {
        console.log("test");
    }

    render() {

        // let showLoginRodal = "";

        // if (this.state.isSignedIn)
        //     showLoginRodal = <Rodal visible={this.state.visible} onClose={this.hide}>
        //         <div>
        //             <h2>Signin successfully!</h2>
        //             {/* <h3>Welcome {firebase.auth().currentUser.displayName}</h3> */}
        //         </div>
        //     </Rodal>

        let displayLogInfo = null;

        if (!this.state.isSignedIn) {
            displayLogInfo = <h3>Please Login below to access the website</h3>

        }

        let displayUserPic = "";

        if (this.state.img !== null)
            console.log("has pics");
        else
            console.log("no pics")



        // displayUserPic = <img className="userImg" src={firebase.auth().currentUser.photoURL} alt="User" />

        // console.log("User:" + (firebase.auth().currentUser.photoURL));

        // if(firebase.auth().currentUser.photoURL)

        // if (firebase.auth().currentUser !== null)
        //     if (firebase.auth().currentUser.photoURL() === null)
        //         console.log("has photo");
        // else
        //     console.log("no phoot");

        return (
            <div className="App">

                {displayLogInfo}
                {this.state.isSignedIn ? (
                    <span  >
                        <h1>Welcome {firebase.auth().currentUser.displayName}</h1>

                        <img className="userImg" src={firebase.auth().currentUser.photoURL} alt="User profile" />

                    </span>
                ) : (
                        <StyledFirebaseAuth
                            uiConfig={this.uiConfig}
                            firebaseAuth={firebase.auth()}
                        />

                    )}
            </div>

        )
    }
}

export default Logging;