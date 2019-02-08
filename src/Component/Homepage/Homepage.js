import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { AwesomeButton } from 'react-awesome-button';
import './Homepage.css';

//library imports
import Typist from 'react-typist';
import ReactRevealText from 'react-reveal-text';
import 'react-awesome-button/dist/styles.css';

class Homepage extends Component {

    state = {
        show: false
    };

    componentDidMount() {
        setTimeout(() => {
            this.setState({ show: true });
        }, 2000);
    }


    render() {

        let title1 = "S3cur!ty 0v3rl0rd";
        let title2 = "Password Generator";

        const style = { color: "blue", lineHeight: "36px" };

        return (
            <div>
                {/* <Typist> */}

                {/* Password Generator */}
                {/* </Typist> */}
                <ReactRevealText style={{ fontWeight: 'bold', fontSize: "55px" }} show={this.state.show} text={title1} />
                <ReactRevealText style={{ frontSize: "35px", padding: "4%" }} show={this.state.show} text={title2} />

                <AwesomeButton>
                    <NavLink className="link" to="/generate-password">Generate your password</NavLink>
                </AwesomeButton>
            </div >

        )
    };

};

export default Homepage;