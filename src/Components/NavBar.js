import React from 'react';
import "../Styles/NavBar.css";
const NavBar = () => {
    return (
        <nav className="NavBar">
            <div className="nav-logo">
                <a href="#home">Tip A Tweet</a>
            </div>
            <div className="nav-links">
                <a href="#home">Home</a>
                <a href="#Tip-A-Tweet">Tip A Tweet</a>
                <a href="#claim-tips">Withdraw Tips</a>
            </div>
        </nav>
    );
}

export default NavBar;
