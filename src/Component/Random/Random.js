import React, { Component } from 'react'
import Checkbox from '@material-ui/core/Checkbox';
import Slider from '@material-ui/lab/Slider';

import './Random.css';

const styles = {
    root: {
        width: 50,
    },
    slider: {
        overflowX: 'hidden',
        padding: '22px 0px',
    },
};

class Random extends Component {

    state = {
        randomPassword: "",
        isUpper: false,
        isLower: false,
        isNumber: false,
        isSpecial: false,
        value: 30
        // checkedA: false,
        // checkedB: false,
        // checkedF: false,
    }

    randomGenerate = (length) => {
        let randPass = "";

        if (length > 0) {
            for (let i = 0; i < length; i++) {

                if (this.state.isNumber) {
                    console.log("generate number");
                }

                if (this.state.isSpecial) {
                    console.log("");
                }

                //generate random numbers
                // randPass += 
            }
        }

    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    handleSlider = (event, value) => {
        this.setState({ value });
        console.log(this.state.value);
    };

    render() {
        return (
            <div>
                <h2>Random password generator</h2>
                <div className="generatePass">
                    <span>Uppercase (eg: A, D, E, W, Z)</span>
                    <Checkbox
                        checked={this.state.checkedA}
                        onChange={this.handleChange('checkedA')}
                        color="primary" />
                    <br />

                    <span>Lowercase (eg: a, e, b, d, l)</span>
                    <Checkbox
                        checked={this.state.checkedA}
                        onChange={this.handleChange('checkedA')}

                        color="primary" />
                    <br />

                    <span>Special characters (eg: !, @, #, $, %)</span>
                    <Checkbox
                        checked={this.state.checkedA}
                        onChange={this.handleChange('checkedA')}

                        color="primary" />
                    <br />

                    <span>Numbers (eg: 1, 4, 6, 7)</span>
                    <Checkbox
                        checked={this.state.checkedB}
                        onChange={this.handleChange('checkedB')}

                        color="primary" />
                    <br />


                    <span>Length of password</span>
                    <input value={this.state.value} ></input>
                    <br />
                    <div className="slider">
                        <Slider
                            className="sliders"
                            value={this.state.value}
                            min={1}
                            max={50}
                            step={1}
                            onChange={this.handleSlider}
                        />
                    </div>
                    <br />

                    <button>Generate</button>
                    <p>*by default, it will generate random password with text only</p>


                </div>
            </div>
        )
    }
}

export default Random;