import React from 'react';
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';

import './Button.css';

const Button = (props) => (

    <AwesomeButton bubbles={true} visible={props.shows} size={props.size} type={props.type} action={props.click}>
        {props.children}
    </AwesomeButton>
);

export default Button;