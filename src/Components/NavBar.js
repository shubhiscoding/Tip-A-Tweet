import React, { useState, useEffect } from 'react';
import "../Styles/NavBar.css";


const NavBar = () => {
    const [currentProvider, setCurrentProvider] = useState("Sepolia ETH");

    useEffect(() => {
        if (localStorage.getItem("currentProvider")) {
          setCurrentProvider(localStorage.getItem("currentProvider"));
        }else{
            localStorage.setItem("currentProvider", currentProvider);
        }
      }, [currentProvider]); // Include currentProvider in dependency array

    const handleInputChange = (e) => {
        const newValue = e.target.value;
        setCurrentProvider(newValue);
        localStorage.setItem("currentProvider", newValue);
        window.location.reload();
      };
    return (
        <nav className="NavBar">
            <div className="Networks">
            <select
                id="providerSelect"
                value={currentProvider}
                className="inputs"
                onChange={handleInputChange}
            >
                <option value="Sepolia ETH">Sepolia ETH</option>
                <option value="Amoy Matic">Amoy Matic</option>
            </select>
            </div>
            <div className="nav-links">
                <a href="#claim-tips">Claim Tips</a>
            </div>
        </nav>
    );
}

export default NavBar;
