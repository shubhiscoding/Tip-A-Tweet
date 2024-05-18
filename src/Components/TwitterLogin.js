import React, { useEffect, useState } from 'react';
import { ethers } from "ethers";
import { signInWithPopup, signOut, TwitterAuthProvider, onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/firebase"; // Adjust the import path if needed
import '../Styles/TwitterLogin.css';

const TwitterLogin = () => {
  const [user, setUser] = useState(null);
  const [Username, setUsername] = useState(null);
  const [signer, setSigner] = useState(null); // Add this line  
  const [Tip, setTip] = useState(null);

  const handleTwitterLogin = async () => {
    const provider = new TwitterAuthProvider();
    try {
      await signInWithPopup(auth, provider)
        .then((userCredential) => {
          const screenName = userCredential.user.reloadUserInfo.screenName;
          setUsername(screenName);
          localStorage.setItem('Username', screenName);
          console.log(screenName);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      localStorage.removeItem('Username');
      setUsername(null);
      setTip(null);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        const storedUsername = localStorage.getItem('Username');
        if (storedUsername) {
          setUsername(storedUsername);
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (Username) {
      paytip();
    }
  }, [Username]);

  const paytip = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);

      const sign = await provider.getSigner();
      setSigner(sign);
      const contractAddress = "0x2d61C3fe1188CFb16ABaA387c7F66Fedfa8D3158";
      const contractABI = [
        "function ammountOfTip(string memory username) public view returns (uint256)"
      ];

      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      const tx = await contract.ammountOfTip(Username);

      setTip(tx.toString());
    } catch (err) {
      console.log(err);
    }
  };

  const withdraw = async () => {
    const contractAddress = "0x2d61C3fe1188CFb16ABaA387c7F66Fedfa8D3158";
    const withdrawABI = ["function withdraw(string memory username) public"];
    const contract = new ethers.Contract(contractAddress, withdrawABI, signer);
    const tx = await contract.withdraw(Username);
    tx.wait()
    .then((receipt) => {
      console.log("Withdrawn");
      console.log(receipt['hash']);
    })
    console.log(tx);
  };

  return (
    <div className="TwitterLogin">
      {user ? (
        <div>
          <h1>Welcome, {Username}!</h1>
          {Tip && <div>
            <p>You have {ethers.formatEther(Tip.toString())} tips!</p>
            <button onClick={withdraw} className="twitter-withdraw-btn">Withdraw</button>
            </div>}
          <button onClick={handleLogout} className="twitter-logout-btn">Logout</button>
        </div>
      ) : (
        <div>
          <h1>Claim Your Tips</h1>
          <button onClick={handleTwitterLogin} className="twitter-login-btn">Login with Twitter</button>
        </div>
      )}
    </div>
  );
};

export default TwitterLogin;
