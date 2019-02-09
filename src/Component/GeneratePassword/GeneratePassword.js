import React, { Component } from 'react';
import Encryption from '../Encryption/Encryption';
import Decryption from '../Decryption/Decryption';
import Toggle from 'react-toggle'

import './GeneratePassword.css';
class GeneratePassword extends Component {

    state = {
        chose: true
    }

    toggleChose = () => {

        let click = this.state.chose;

        this.setState({ chose: !click })
        console.log(this.state.chose)
    }

    render() {

        let display = "";

        if (this.state.chose)
            display = <Encryption />
        else
            display = <Decryption />

        return (
            <div >
                {/* <h2>Security Overlord</h2> */}

                <span>Encryption</span><Toggle
                    icons={false}
                    onChange={this.toggleChose}
                /><span>Decryption</span>
                {display}

                <p className="warning">Note: This web-application will not track your keystroke but
                    we do not hold account for any password leak.</p>

            </div>
        )
    };
};

export default GeneratePassword;