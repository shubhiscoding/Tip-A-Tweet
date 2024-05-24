import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import "../Styles/TwitterLogin.css";
import Loading from "./loading";

const Withdraw = (data) => {
  const [Tip, setTip] = useState(null);
  const [signer, setSigner] = useState(null);
  const Username = data["data"]["Username"];
  const currentProvider = data["data"]["networkProvider"];
  const [loading, setLoading] = useState(false);

  const networkParams = {
    "Sepolia ETH": {
      chainId: "0xaa36a7", // Chain ID for Sepolia
      chain: "11155111",
      chainName: "Sepolia Test Network",
      rpcUrls: ["https://rpc.sepolia.org"],
      nativeCurrency: { name: "Ethereum", symbol: "ETH", decimals: 18 },
      blockExplorerUrls: ["https://sepolia.etherscan.io"],
      contractAddress: "0x6Bf6dc601F0eD1E688b5a49c48d75696057099F4",
    },
    "Amoy Matic": {
      chainId: "0x13882", // Chain ID for Mumbai (Polygon Testnet)
      chain: "80002",
      chainName: "Amoy Test Network",
      rpcUrls: ["https://rpc-amoy.polygon.technology/"],
      nativeCurrency: { name: "Matic", symbol: "MATIC", decimals: 18 },
      blockExplorerUrls: ["https://www.oklink.com/amoy"],
      contractAddress: "0x2d61C3fe1188CFb16ABaA387c7F66Fedfa8D3158",
    },
  };

  const ContractAdd = networkParams[currentProvider].contractAddress;

  const switchNetwork = async () => {
    if (!window.ethereum) throw new Error("No crypto wallet found");
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: networkParams[currentProvider].chainId }],
      });
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [networkParams[currentProvider]],
          });
        } catch (addError) {
          console.error(addError);
        }
      } else {
        console.error(switchError);
      }
    }
  };

  const paytip = async () => {
    try {
      switchNetwork();
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);

      const sign = await provider.getSigner();
      setSigner(sign);
      const contractAddress = ContractAdd;
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
    switchNetwork();
    const contractAddress = ContractAdd;
    const withdrawABI = ["function withdraw(string memory username) public"];
    const contract = new ethers.Contract(contractAddress, withdrawABI, signer);
    setLoading(true);
    const tx = await contract.withdraw(Username);
    tx.wait().then((receipt) => {
      console.log("Withdrawn");
      console.log(receipt["hash"]);
    });
    setLoading(false);
    console.log(tx);
    handleRefresh();
  };

  useEffect(() => {
    paytip();
  });

  const handleRefresh = () => {
    setTip(null);
    setLoading(true);
    setTimeout(() => {}, 10000);
    setLoading(false);
    paytip();
  };

  return (
    <div className="Withdraw">
      {Tip && !loading ? (
        <div className="withdraw-block">
          <div className="balance">
            {loading && <Loading />}
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
        <div className="loading">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default Withdraw;
