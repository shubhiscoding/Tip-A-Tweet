import React from 'react';
import "../Styles/NavBar.css";
const NavBar = () => {
    return (
        <nav className="NavBar">
            <div className="nav-logo">
                <a href="/">Tip A Tweet</a>
            </div>
            <div className="nav-links">
                <a href="/">Home</a>
                <a href="/">Tip A Tweet</a>
                <a href="/withdraw">Withdraw Tips</a>
            </div>
        </nav>
    );
}

export default NavBar;
