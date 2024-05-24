import NavBar, { getCurrentProvider } from "./Components/NavBar";
import TipForm from "./Components/TipForm";
import Home from "./Components/Home";
import TwitterLogin from "./Components/TwitterLogin";
import "./Styles/TipForm.css";
import "./App.css";
import { BrowserRouter as Route } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  const [currentProvider, setCurrentProvider] = useState("Sepolia ETH");

  useEffect(() => {
    if (localStorage.getItem("currentProvider")) {
      setCurrentProvider(localStorage.getItem("currentProvider"));
    }
  }, []);

  console.log(currentProvider);

  return (
    <div className="App">
      <header className="App-header" id="home">
        <NavBar />
        <Home />
        <TipForm provider={currentProvider} />
        <TwitterLogin currentProvider={currentProvider} />
      </header>
    </div>
  );
}

export default App;
