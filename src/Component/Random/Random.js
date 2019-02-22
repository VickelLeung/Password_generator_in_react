import React, { Component } from 'react'
import Checkbox from '@material-ui/core/Checkbox';
import Slider from '@material-ui/lab/Slider';
import Button from '../UI/Button/Button';
import Rodal from 'rodal';
import firebase from 'firebase';
import axios from '../../axios';
// import { RadioGroup, RadioButton } from 'react-radio-buttons';

import './Random.css';

class Random extends Component {

    state = {
        randomPassword: "",
        isUpper: false,
        isLower: false,
        isNumber: false,
        isSpecial: false,
        value: 15,
        lowerChar: "",
        upperChar: "",
        specialChars: "",
        numbers: "",
        visible: false,
        saveVisible: false

    }

    componentDidMount = () => {
        let upperAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let lowerAlphabet = "abcdefghijklmnopqrstuvwxyz";
        let numbers = "0123456789";
        let special = "!@#$%^&*()~";

        this.setState({
            lowerChar: lowerAlphabet,
            upperChar: upperAlphabet,
            numbers: numbers,
            specialChars: special
        })
    }

    randomGenerate = () => {
        let randPass = "";
        let length = this.state.value;

        this.setRandomizer();
        let upper = this.state.upperChar;
        let lower = this.state.lowerChar;
        let number = this.state.numbers;
        let special = this.state.specialChars;

        let multiple = false;

        if (length > 0) {

            if (!this.state.isUpper && !this.state.isLower && !this.state.isNumber && !this.state.isSpecial)
                this.setState({ visible: true });

            else {
                for (let i = 0; i < length; i++) {

                    //uppercase
                    if (this.state.isUpper && !this.state.isLower && !this.state.isNumber && !this.state.isSpecial) {
                        console.log("only upper")
                        randPass += upper.charAt(Math.random() * upper.length);
                    }

                    //lowercase
                    else if (!this.state.isUpper && this.state.isLower && !this.state.isNumber && !this.state.isSpecial) {
                        console.log("only lower");
                        randPass += lower.charAt(Math.random() * lower.length);
                    }

                    //numbers
                    else if (!this.state.isUpper && !this.state.isLower && this.state.isNumber && !this.state.isSpecial) {
                        console.log("numbs only");
                        randPass += number.charAt(Math.random() * number.length);
                    }

                    //specials
                    else if (!this.state.isUpper && !this.state.isLower && !this.state.isNumber && this.state.isSpecial) {
                        console.log("numbs only");
                        randPass += special.charAt(Math.random() * special.length);
                    }
                    else
                        multiple = true;
                }

                //if user select more than one options
                if (multiple) {
                    //to randomize the occurence of each types: upper,lower,numbers,symbols
                    let choices = this.setRandomizer();

                    //parse and deciphers the types
                    for (let i = 0; i < length; i++) {
                        if (choices.charAt(i) === "U") {
                            randPass += upper.charAt(Math.random() * upper.length);
                        }
                        else if (choices.charAt(i) === "L") {
                            randPass += lower.charAt(Math.random() * lower.length);
                        }
                        else if (choices.charAt(i) === "N") {
                            randPass += number.charAt(Math.random() * number.length);
                        }
                        else if (choices.charAt(i) === "S") {
                            randPass += special.charAt(Math.random() * special.length);
                        }
                    }

                }

                this.setState({ randomPassword: randPass });
            }
        }
    }

    handleChange = name => event => {
        let allFalse = false;

        if (this.state.checkedA === false && this.state.checkedA === false && this.state.checkedC === false)
            allFalse = true;

        this.setState({ [name]: event.target.checked, unchecked: allFalse });
    };

    handleSlider = (event, value) => {

        this.setState({ value });
    };

    setRandomizer = () => {

        let upperAndLower = "UL";
        let upperAndNum = "UN";
        let upperAndSpecial = "US";
        let lowerAndNum = "LN";
        let lowerAndSpecial = "LS";
        let specialAndNumber = "SN";

        let upperAndLowerAndNumber = "ULN";
        let upperAndLowerAndSpecial = "ULS";
        let upperAndNumberAndSpecial = "UNS";
        let lowerAndSpecialAndNumber = "LSN";

        let allChose = "ULNS";
        let randomize = "";

        //upper and lower
        if (this.state.isUpper && this.state.isLower && !this.state.isNumber && !this.state.isSpecial) {
            randomize = this.randomizeHelper(upperAndLower);
        }

        //upper and numbers
        if (this.state.isUpper && !this.state.isLower && this.state.isNumber && !this.state.isSpecial) {
            randomize = this.randomizeHelper(upperAndNum);
        }

        //upper and special
        if (this.state.isUpper && !this.state.isLower && !this.state.isNumber && this.state.isSpecial) {
            randomize = this.randomizeHelper(upperAndSpecial);
        }

        //lower and number
        if (!this.state.isUpper && this.state.isLower && this.state.isNumber && !this.state.isSpecial) {
            randomize = this.randomizeHelper(lowerAndNum);
        }

        //lower and special
        if (!this.state.isUpper && this.state.isLower && !this.state.isNumber && this.state.isSpecial) {
            randomize = this.randomizeHelper(lowerAndSpecial);
        }

        //special and number
        if (!this.state.isUpper && !this.state.isLower && this.state.isNumber && this.state.isSpecial) {
            randomize = this.randomizeHelper(specialAndNumber);
        }

        //upper and lower and number
        if (this.state.isUpper && this.state.isLower && !this.state.isNumber && this.state.isSpecial) {
            randomize = this.randomizeHelper(upperAndLowerAndSpecial);
        }

        //upper and lower and special
        if (this.state.isUpper && this.state.isLower && this.state.isNumber && !this.state.isSpecial) {
            randomize = this.randomizeHelper(upperAndLowerAndNumber);
        }

        //upper and number and special
        if (this.state.isUpper && !this.state.isLower && this.state.isNumber && this.state.isSpecial) {
            randomize = this.randomizeHelper(upperAndNumberAndSpecial);
        }

        //lower and number and special
        if (!this.state.isUpper && this.state.isLower && this.state.isNumber && this.state.isSpecial) {
            randomize = this.randomizeHelper(lowerAndSpecialAndNumber);
        }

        //all choices
        if (this.state.isUpper && this.state.isLower && this.state.isNumber && this.state.isSpecial) {
            randomize = this.randomizeHelper(allChose);
        }

        return randomize;
    }

    randomizeHelper = (choices) => {
        let accumulator = "";
        for (let i = 0; i < this.state.value; i++) {
            accumulator += choices.charAt(Math.random() * choices.length);
        }
        return accumulator;
    }

    show = () => {
        this.setState({ visible: true })
    }


    saveHandler = (event) => {
        // event.preventDefault();

        let userData = {
            password: ""
        }
        userData.password = this.state.randomPassword;

        if (firebase.auth().currentUser) {
            let uid = firebase.auth().currentUser.uid
            console.log(uid);

            axios.post("/" + uid + '/random-password.json', userData)
                .then(response => {
                    // console.log("modals true");
                    this.showSave();
                    // this.setState({ loading: false });
                    // this.props.history.push('/');
                })

        }
    }

    hide = () => {
        this.setState({ visible: false })
    }

    showSave = () => {
        this.setState({ saveVisible: true })
    }

    hideSave = () => {
        this.setState({ saveVisible: false })
    }

    render() {

        let displayPass = "";

        if (this.state.randomPassword !== "") {
            displayPass = <div>
                <h3>{this.state.randomPassword}</h3>
                {/* <Button click={this.saveHandler} type="anchor" >Save Password</Button> */}
            </div>
        }

        return (
            <div>
                <h2>Random password generator</h2>
                <div className="generatePass">
                    <span>Uppercase (eg: A, D, E, W, Z)</span>
                    <Checkbox
                        checked={this.state.isUpper}
                        onChange={this.handleChange('isUpper')}
                        color="primary" />
                    <br />

                    <span>Lowercase (eg: a, e, b, d, l)</span>
                    <Checkbox
                        checked={this.state.isLower}
                        onChange={this.handleChange('isLower')}

                        color="primary" />
                    <br />

                    <span>Special characters (eg: !, @, #)</span>
                    <Checkbox
                        checked={this.state.isSpecial}
                        onChange={this.handleChange('isSpecial')}

                        color="primary" />
                    <br />

                    <span>Numbers (eg: 1, 4, 6, 7)</span>
                    <Checkbox
                        checked={this.state.isNumber}
                        onChange={this.handleChange('isNumber')}

                        color="primary" />
                    <br />

                    <span>Length of password:  </span>
                    {/* <input type="number" ></input> */}
                    <h3>{this.state.value}</h3>
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

                    <Button click={this.randomGenerate}>Generate</Button>

                    {displayPass}

                    <Rodal visible={this.state.visible} onClose={this.hide}>
                        <div>
                            <h2>Please select at least one checkbox</h2>
                        </div>
                    </Rodal>

                    <Rodal visible={this.state.saveVisible} onClose={this.hideSave}>
                        <div>
                            <h2>Your data have been saved!</h2>
                        </div>
                    </Rodal>

                </div>
            </div>
        )
    }
}

export default Random;