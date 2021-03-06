import React, { Component } from 'react';

import Button from './../UI/Button/Button';
import axios from '../../axios';
import firebase from 'firebase';
import { AwesomeButtonProgress } from 'react-awesome-button';
import { Form, TextArea } from 'semantic-ui-react'

import Rodal from 'rodal';
// include styles
import 'rodal/lib/rodal.css';

class Encryption extends Component {

    state = {
        password: "",
        userInput: "",
        leetPass: "",
        fixedKey: "",
        userKey: [],
        verb: [],
        nouns: [],
        pronoun: [],
        isLeet: false,
        clickLeet: true,
        dataSave: {
            password: "",
            encryption: "",
            key: ""
        },
        visible: false
    }

    updateUserInput = (event) => {
        let input = "";
        input = event.target.value;
        console.log(input);
        this.setState({ userInput: input });
    }

    convertToLeet = () => {

        let str = this.state.userInput;

        for (let i = 0; i < str.length; i++) {
            if (str.charAt(i) === 'a')
                str = str.replace("a", "@");
            if (str.charAt(i) === 'b')
                str = str.replace("b", "8");
            if (str.charAt(i) === 'e')
                str = str.replace("e", "3");
            if (str.charAt(i) === 'l')
                str = str.replace("l", "1");
            if (str.charAt(i) === 's')
                str = str.replace("s", "$");
            if (str.charAt(i) === 't')
                str = str.replace("t", "7");
            if (str.charAt(i) === 'o')
                str = str.replace("o", "0");
        }

        this.setState({ leetPass: str, isLeet: true })
    }

    encryption = () => {

        let userInput = this.state.userInput;
        let newInput = "";
        let newPass = "";
        let keyString = [];
        let newData = { ...this.state.dataSave }

        for (let i = 0; i < userInput.length; i++) {
            keyString[i] = Math.round((Math.random() * 5) + 1);
            newInput = String.fromCharCode(userInput.charCodeAt(i) + keyString[i]);
            newPass += newInput;
        }
        // console.log("userPass" + userInput);
        newData.password = userInput;
        newData.encryption = newPass;
        newData.key = keyString;
        console.log("newData Pass" + newData.password + " new data key" + newData.key);
        this.setState({ userKey: keyString, password: newPass, dataSave: newData })
        console.log("newData Pass:" + this.state.dataSave.password + " new data key:" + this.state.dataSave.key);
    }

    modulus = () => {

    }

    saveHandler = (event) => {
        // event.preventDefault();

        const userData = {
            ...this.state.dataSave
        }

        console.log(userData.password + " " + userData.key)

        if (firebase.auth().currentUser) {
            let uid = firebase.auth().currentUser.uid
            console.log(uid);


            console.log("userData" + userData);
            if (userData.password !== "" && userData.key !== "")
                axios.post("/" + uid + '/user-data.json', userData)
                    .then(response => {
                        console.log("modals true");
                        this.show();
                        // this.setState({ loading: false });
                        // this.props.history.push('/');
                    })
                    .catch(error => {

                        // this.setState({ loading: false });
                    });
        }
    }

    onToggleHit = (click) => {
        console.log("entered toggle");
        console.log("click:" + click + " click == leet: " + click === 'leet');
        switch (click) {
            case click === "leet":
                this.setState({ clickLeet: true })
                console.log(this.state.clickLeet)
                break;
            default:
                return

        }
    }

    show = () => {
        this.setState({ visible: true });
    }

    hide = () => {
        this.setState({ visible: false });
    }

    render() {

        let displayLeet = "";
        let toggleLeet = "";
        let displayKey = "";


        let displayPassword = "";

        if (this.state.password) {
            displayKey = <div>
                <p>Here is your new password: {this.state.password}</p>
                <p>Here is the key {this.state.userKey}</p>
            </div>
        }

        if (this.state.isLeet)
            displayLeet = <h3>{this.state.leetPass}</h3>

        if (this.state.clickLeet)
            toggleLeet = <div>
                <span>Convert to l33t </span><input type="text" onChange={this.updateUserInput} />
                <Button type="secondary" click={this.convertToLeet}>Convert</Button>
                {displayLeet}
            </div>

        // if (this.state.userKey)
        //     displayPara = <div>
        //         <p>Here is your Encrypted paragraph</p>
        //     </div>

        return (
            <div>

                <h2>Encrypt your password</h2>

                <div className="generatePass">

                    {toggleLeet}

                    <span>Encrypt your password with key</span> <input onChange={this.updateUserInput} type="text" />
                    <Button type="secondary" click={this.encryption}>Encrypt</Button>
                    <Button click={this.saveHandler}>Save Encryption</Button>
                    {displayKey}

                    <Rodal visible={this.state.visible} onClose={this.hide}>
                        <div>
                            <h2>Your content have been saved.</h2>
                        </div>
                    </Rodal>

                </div>
            </div>
        )
    }
}

export default Encryption;