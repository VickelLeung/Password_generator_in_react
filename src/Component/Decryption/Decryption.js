import React, { Component } from 'react';
import Button from './../UI/Button/Button';

class Decryption extends Component {

    state = {
        key: "",
        userInput: "",
        password: ""
    }

    updateUserInput = (event) => {
        let input = "";
        input = event.target.value;
        console.log(input);
        this.setState({ userInput: input });
    }

    updateUserKey = (event) => {
        let keys = "";
        keys = event.target.value;
        console.log(keys);
        this.setState({ key: keys });
    }

    decryption = () => {
        let userInput = this.state.userInput;
        let userKey = this.state.key;
        let newInput = "";
        let newPass = "";
        let keyList = [];
        //add key to keyList aray
        for (let i = 0; i < userKey.length; i++)
            keyList[i] = userKey.charAt(i);

        //decrypting password
        for (let i = 0; i < userInput.length; i++) {
            newInput = String.fromCharCode(userInput.charCodeAt(i) - keyList[i]);
            newPass += newInput;
        }

        this.setState({ password: newPass })
    }

    render() {

        let displayKey = "";

        if (this.state.password) {
            displayKey = <div>
                <p>Here is your decrypted password: {this.state.password}</p>
            </div>
        }

        return (

            <div>
                <h2>Decrypt your password</h2>
                <div className="generatePass">
                    <input onChange={this.updateUserInput} type="text" placeholder="Enter your Encryption" />
                    <input onChange={this.updateUserKey} type="text" placeholder="Enter your key" />
                    <Button type="secondary" click={this.decryption}>Decrypt</Button>
                    {displayKey}
                    <p>*you will need to provide an encryption and key to decrypt.</p>

                    {/* <br />
                <span>Decrypt your sentence with modulus</span> <input onChange={this.updateUserInput} type="text" placeholder="Enter your password" />
                <Button type="secondary" click={this.modulus}>Encrypt</Button> */}

                </div>
            </div>
        )
    }
}

export default Decryption;