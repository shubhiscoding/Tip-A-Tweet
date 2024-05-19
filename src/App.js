import NavBar from "./Components/NavBar";
import TipForm from "./Components/TipForm";
import TwitterLogin from "./Components/TwitterLogin";
import "./Styles/TipForm.css";
import "./App.css";
import { BrowserRouter as Route } from "react-router-dom";

function App() {
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
        <TipForm />
        <TwitterLogin />
      </header>
    </div>
  );
}

export default App;
