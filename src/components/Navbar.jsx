import React from 'react';
import logo1 from "../img/IMG-1370.jpg";

import "../css/navbar.css"

const Navbar = () => {
    return (
        <navbar>
            <a href="/">
                <img src={logo1} alt="logo" /> 
            </a>
        </navbar>
    )
}

export default Navbar;