import logo from './logo.svg';
import './App.css';
import Homepage from './Components/Homepage';
import Logs from './Components/Mongo';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './Components/Navbar';


function App() {
  return (
    <Router>
    <div className="app-container">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/Mongo" element={<Logs/>} />
      </Routes>
     
    </div>
  </Router>
  );
}

export default App;
