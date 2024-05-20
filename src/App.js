import NavBar from "./Components/NavBar";
import TipForm from "./Components/TipForm";
import TwitterLogin from "./Components/TwitterLogin";
import "./Styles/TipForm.css";
import "./App.css";
import { BrowserRouter as Route } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  const [currentProvider, setCurrentProvider] = useState("Sepolia ETH");
  const claimtip = () => {
    document
      .getElementById("claim-tips")
      .scrollIntoView({ behavior: "smooth" });
  };
  const tipatweet = () => {
    document
      .getElementById("Tip-A-Tweet")
      .scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (localStorage.getItem("currentProvider")) {
      setCurrentProvider(localStorage.getItem("currentProvider"));
    }
  }, []);

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value); // Hide the preview when any input changes
    localStorage.setItem("currentProvider", e.target.value);
    window.location.reload();
  };

  return (
    <div className="App">
      <header className="App-header" id="home">
        <NavBar />
        <div className="home">
          <h1>Empower Creators, Support Innovation</h1>{" "}
          {/* Clear and concise introduction */}
          <p>
            Welcome to the platform that revolutionizes tipping for the digital
            age. Here, you can seamlessly reward creators you admire on Twitter
            with cryptocurrency.
          </p>
          <div className="buttons">
            <button onClick={claimtip}>Claim-Tips</button>
            <button onClick={tipatweet}>Tip-A-Tweet</button>
          </div>
        </div>
        <div className="Networks">
          <select
            id="providerSelect"
            value={currentProvider}
            className="inputs"
            onChange={handleInputChange(setCurrentProvider)}
          >
            <option value="Sepolia ETH">Sepolia ETH</option>
            <option value="Amoy Matic">Amoy Matic</option>
          </select>
        </div>
        <TipForm provider={currentProvider}/>
        <TwitterLogin currentProvider={currentProvider}/>
      </header>
    </div>
  );
}

export default App;
