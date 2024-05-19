import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import "../Styles/TwitterLogin.css";

const Withdraw = (userName) => {
  const [Tip, setTip] = useState(null);
  const [signer, setSigner] = useState(null);
  const Username = userName["Username"];
  const disconnectWallet = async () => {
    // Logic to disconnect the user's wallet
    if (window.ethereum && window.ethereum.isConnected()) {
      try {
        await window.ethereum.request({
          method: "wallet_requestPermissions",
          params: [
            {
              eth_accounts: {},
            },
          ],
        });
      } catch (error) {
        console.error("Failed to disconnect wallet:", error);
      }
    }
  };

  const paytip = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);

      const sign = await provider.getSigner();
      setSigner(sign);
      const contractAddress = "0x2d61C3fe1188CFb16ABaA387c7F66Fedfa8D3158";
      const contractABI = [
        "function ammountOfTip(string memory username) public view returns (uint256)",
      ];

      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

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
    tx.wait().then((receipt) => {
      console.log("Withdrawn");
      console.log(receipt["hash"]);
    });
    console.log(tx);
    handleRefresh();
  };

  useEffect(() => {
    paytip();
  });

  const handleRefresh = () => {
    setTip(null);
    setTimeout(() => {}, 10000);
    paytip();
  };

  return (
    <div className="Withdraw">
      {Tip ? (
        <div>
          <div className="balance">
            <p>You have {ethers.formatEther(Tip.toString())} tips!</p>
            <button className="refresh" onClick={handleRefresh}>
              Refresh
            </button>
          </div>
          <div className="withdraw-btns">
            <button onClick={withdraw} className="twitter-withdraw-btn">
              Withdraw
            </button>
          </div>
        </div>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
};

export default Withdraw;
