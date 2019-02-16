import React, { Component } from 'react';
import Encryption from '../Encryption/Encryption';
import Decryption from '../Decryption/Decryption';
import Button from './../UI/Button/Button';
import Random from '../Random/Random';

import Toggle from 'react-toggle';

import './GeneratePassword.css';
class GeneratePassword extends Component {

    state = {
        chose: ""
    }

    // toggleChose = () => {

    //     let click = this.state.chose;

    //     this.setState({ chose: !click })
    //     console.log(this.state.chose)
    // }

    setDisplay = (display) => {
        if (display === "random")
            this.setState({ chose: "random" })
        else if (display === "encryption")
            this.setState({ chose: "encryption" })
        else if (display === "decryption")
            this.setState({ chose: "decryption" })

        console.log("state:" + this.state.chose);
    }

    render() {

        let display = "";

        // switch (user) {
        //     case this.state.chose === "":
        //         console.log("sd");
        //         break;
        // }

        if (this.state.chose === "encryption")
            display = <Encryption />
        else if (this.state.chose === "decryption")
            display = <Decryption />
        else if (this.state.chose === "random")
            display = <Random />

        return (
            <div >
                {/* <h2>Security Overlord</h2> */}

                {/* <span>Encryption</span><Toggle
                    icons={false}
                    onChange={this.toggleChose}
                /><span>Decryption</span> */}
                <Button click={() => this.setDisplay("random")} >Random</Button>
                <Button click={() => this.setDisplay("encryption")} >Encryption</Button>
                <Button click={() => this.setDisplay("decryption")}>Decryption</Button>

                {/* place navbar */}

                {display}

                <p className="warning">Note: This web-application will not track your keystroke but
                    we do not hold account for any password leak.</p>

            </div>
        )
    };
};

export default GeneratePassword;