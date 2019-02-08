import React, { Component } from 'react';

import Button from './../UI/Button/Button';

import { Form, TextArea } from 'semantic-ui-react'

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
        clickLeet: true
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

        for (let i = 0; i < userInput.length; i++) {
            keyString[i] = Math.round((Math.random() * 5) + 1);
            newInput = String.fromCharCode(userInput.charCodeAt(i) + keyString[i]);
            newPass += newInput;
        }

        this.setState({ userKey: keyString, password: newPass })
    }

    modulus = () => {

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

    render() {

        let displayLeet = "";
        let toggleLeet = "";
        let displayKey = "";

        let toggleEncrypt = "";

        let displayPara = "";

        if (this.state.userKey != null) {
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



        if (this.state.userKey)
            displayPara = <div>
                <p>Here is your Encrypted paragraph</p>
            </div>


        return (
            <div>

                {/* <h2>Choose your type of password generator</h2> */}

                <div className="generatePass">

                    {toggleLeet}

                    <span>Encrypt your password with key</span> <input onChange={this.updateUserInput} type="text" placeholder="Enter your password" />
                    <Button type="secondary" click={this.encryption}>Encrypt</Button>
                    {displayKey}

                </div>
            </div>
        )
    }
}

export default Encryption;