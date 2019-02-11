import React from 'react';
import { NavLink } from 'react-router-dom';

import './Header.css';

const header = () => {

    return (
        <div>
            <nav>
                <NavLink className="link" to="/logging">Logging/Registration</NavLink>
            </nav>
        </div >
    )

}

export default header;