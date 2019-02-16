import React from 'react';

import './userInfo.css';

const userInfo = (props) => {

    return (
        <div>
            <section className="box">
                <p>Password: {props.password} </p>
                <p>Encryption: {props.encryption}</p>
                <p>Key: {props.keys}</p>
                <button>Delete Information</button>
            </section>

        </div>
    );
};

export default userInfo;