import { useState } from "react";
import TweetPreview from "./TweetPreview";
import { ethers, parseEther } from "ethers";
// import { parseEther } from "ethers/lib/utils";

const TipForm = () => {
  const [Username, setUsername] = useState("");
//   const [network, setNetwork] = useState("Ethereum");
//   const [Address, setAddress] = useState("");
  const [Url, setUrl] = useState("");
  const [Tip, setTip] = useState(0);
  const tipform = async () => {
    if (Url) {
      const parts = Url.split("/");
      setUsername(parts[3]);
      console.log(Username);
    }
  };

  const paytip = async () => {
    try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        // Request account access if needed
        await provider.send("eth_requestAccounts", []);

        // Get the signer
        const signer = await provider.getSigner();

        // Define the contract address and ABI
        const contractAddress = "0x2d61C3fe1188CFb16ABaA387c7F66Fedfa8D3158";
        const contractABI = [
            "function tip(string memory username) public payable"
        ];

        // Initialize the contract
        const contract = new ethers.Contract(contractAddress, contractABI, signer);

        // Parse the tip amount to wei
        const tipAmount = ethers.parseEther(Tip.toString());
        // Call the tip function with the username and send the tip amount as msg.value
        const tx = await contract.tip(Username, { value: tipAmount });

        // Wait for the transaction to be mined
        await tx.wait();

        // Log the transaction details
        console.log(tx);
        console.log("Tip sent");
        } catch (err) {
        // Log any errors
        console.log(err);
        }
    };


  return (
    <div className="TipForm">
      <h1>Tip a Tweet</h1>
      <input
        type="text"
        placeholder="Enter Tweet url"
        onChange={(e) => setUrl(e.target.value)}
      />
      <div className="ammount">
        <input
          type="Number"
          placeholder="Enter your tip"
          onChange={(e) => setTip(e.target.value)}
        />

        <select id="networkSelect">
          <option value="Ethereum">Ethereum</option>
          <option value="Sepolia ETH">Sepolia ETH</option>
          <option value="Amoy Matic">Amoy Matic</option>
        </select>
      </div>
      <div className="labels">
        <label>
          <input type="checkbox" />
          <span>Stay Anonymous</span>
        </label>
        <button onClick={tipform}>Tip the tweet</button>
      </div>
      {Username && (
        <div className="tweet">
          {" "}
          <TweetPreview url={Url} payTip={paytip} />{" "}
        </div>
      )}
    </div>
  );
};

export default TipForm;
