import './App.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import Header from "./components/Header"

import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
function App() {
  return (
      <div className="App">
        <Router>
          <Header/>
          <Routes>


          </Routes>

        </Router>
      </div>

  );
}

export default App;
