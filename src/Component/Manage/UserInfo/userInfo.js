import React from 'react';

import './userInfo.css';

const userInfo = (props) => {

    return (
        <div>
            <section className="box">
                <p>Password: {props.password} </p>
                <p>Key: {props.keys}</p>
            </section>

        </div>
    );
};

export default userInfo;