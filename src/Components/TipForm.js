import { useEffect, useState } from "react";
import TweetPreview from "./TweetPreview";
import { ethers } from "ethers";

const TipForm = (provider) => {
  const [Username, setUsername] = useState("");
  const [Url, setUrl] = useState("");
  const [Tip, setTip] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const currentProvider = provider['provider'];

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
    console.log(currentProvider, ContractAdd);
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


  const tipform = async () => {
    if(!Url || !Tip){
      alert("Please enter a valid tweet url and tip amount");
      return;
    }
    if (Url) {
      const parts = Url.split("/");
      setUsername(parts[3]);
      console.log(Username);
    }
    setShowPreview(true);
  };

  useEffect(() => {
    if(showPreview){
      document.getElementById("preview").scrollIntoView({ behavior: "smooth" });
    }
  }, [showPreview]);

  const paytip = async () => {
    try {
      await switchNetwork();
      const provider = new ethers.BrowserProvider(window.ethereum);
      // Request account access if needed
      await provider.send("eth_requestAccounts", []);

      // Get the signer
      const signer = await provider.getSigner();
      const signerBalance = await provider.getBalance(signer.address);
      // Define the contract address and ABI
      const contractAddress = ContractAdd;
      const contractABI = [
        "function tip(string memory username) public payable",
      ];

      // Initialize the contract
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      // Parse the tip amount to wei
      const tipAmount = ethers.parseEther(Tip.toString());
      // Call the tip function with the username and send the tip amount as msg.value
      if (tipAmount > signerBalance) {
        alert(
          "Insufficient Funds for the Transaction, Please enter a valid ammount"
        );
        console.log("check");
      } else {
        console.log(Tip, " mybal", signerBalance);
      }
      const tx = await contract.tip(Username, { value: tipAmount });

      // Wait for the transaction to be mined
      await tx.wait();
      withdrawn();
      // Log the transaction details
      console.log(tx);
      console.log("Tip sent");
    } catch (err) {
      console.log(err.message);
      if (err.message.includes("User denied transaction signature")) {
        alert("Please confirm the transaction to tip the tweet");
      }
      if (err.message.includes("Tip amount must be greater than 0.001 ether")) {
        alert("Please enter a Tip ammount greater then 0.001 matic");
      }
    }
  };

  const withdrawn = async () => {
    const preview = document.getElementsByClassName("TweetPreview")[0];
    const inputs = document.getElementsByClassName("tweetInput");
    if (inputs) {
      for (var i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
      }
    }
    if (preview) {
      preview.style.display = "none";
    } else {
      console.error("Element with class 'TweetPreview' not found.");
    }
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setShowPreview(false); // Hide the preview when any input changes
  };

  return (
    <div className="TipForm" id="Tip-A-Tweet">
      <h1>Tip a Tweet</h1>
      <input
        type="text"
        className="tweetInput"
        placeholder="Enter Tweet url"
        onChange={handleInputChange(setUrl)}
      />
      <input
        type="number"
        className="tweetInput"
        placeholder="Enter your tip Amount"
        onChange={handleInputChange(setTip)}
      />
      <div className="labels">
        <button onClick={tipform}>Tip the tweet</button>
      </div>
      {showPreview && Username && (
        <div className="tweet" id="preview">
          {" "}
          <TweetPreview url={Url} payTip={paytip} />{" "}
        </div>
      )}
    </div>
  );
};

export default TipForm;
