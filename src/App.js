import NavBar from './Components/NavBar';
import TipForm from './Components/TipForm';
import TwitterLogin from './Components/TwitterLogin';
import "./Styles/TipForm.css"
import { BrowserRouter as Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NavBar />
        <TipForm />
        <TwitterLogin />
      </header>
    </div>
  );
}

export default App;
