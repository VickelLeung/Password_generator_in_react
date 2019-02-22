import React from 'react';

import '../UserInfo/userInfo.css';

const userInfo = (props) => {

    return (
        <div>
            <section className="box">
                <p>Random password: {props.randomPass}</p>
                <button onClick={props.delete}>Delete Information</button>
            </section>
        </div>
    );
};

export default userInfo;