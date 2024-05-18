import React, { useEffect, useState } from 'react';
import { signInWithRedirect, signOut, TwitterAuthProvider, onAuthStateChanged, getRedirectResult } from "firebase/auth";
import { auth } from "../Firebase/firebase"; // Adjust the import path if needed
import '../Styles/TwitterLogin.css';

const TwitterLogin = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(null);

  const handleTwitterLogin = async () => {
    const provider = new TwitterAuthProvider();
    try {
      await signInWithRedirect(auth, provider);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async(user) => {
      if (user) {
        setUser(user);
        const result = await getRedirectResult(auth);
        console.log(user.displayName);
      } else {
        setUser(null);
        setUsername(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="TwitterLogin">
      {user ? (
        <div>
          <h1>Welcome, {user.displayName}!</h1>
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
