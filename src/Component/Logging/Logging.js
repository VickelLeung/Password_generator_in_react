import React, { Component } from 'react';
import firebase from 'firebase';
import Button from '../UI/Button/Button';
import Rodal from 'rodal';
import { NavLink } from 'react-router-dom';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import './Logging.css'

firebase.initializeApp({
    apiKey: "AIzaSyCmZJMPZjDi7K34uw5iQMmatD329f0TT3M",
    authDomain: "bodycheck-8d735.firebaseapp.com"
})

class Logging extends Component {


    state = { isSignedIn: false, visible: true }
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
            this.setState({ isSignedIn: !!user })
            console.log("user", user)
        })
    }

    show = () => {
        this.setState({ visible: true });
    }

    hide = () => {
        this.setState({ visible: false });
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

        if (!this.state.isSignedIn)
            displayLogInfo = <h3>Please Login below to access the website</h3>

        return (
            <div className="App">

                {displayLogInfo}
                {this.state.isSignedIn ? (
                    <span  >
                        <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
                        <img className="userImg" src={firebase.auth().currentUser.photoURL} alt="User" />
                        {/* <Button click={() => firebase.auth().signOut()}>Sign out!</Button> */}
                        {/* <NavLink to="/generate-password">Generate password</NavLink> */}
                        {/* <NavLink to="/user-information">Saved data</NavLink> */}

                    </span>
                ) : (
                        <StyledFirebaseAuth
                            uiConfig={this.uiConfig}
                            firebaseAuth={firebase.auth()}
                        />

                    )}
                {/* <p>Email: {this.state.email}</p>
                <p>pass: {this.state.password}</p> */}
            </div>

        )
    }
}

export default Logging;