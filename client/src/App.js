import "./App.css";
import Home from "./pages/home/Home.jsx";
import Login from "./pages/login/Login.jsx";
import Confirmation from "./pages/confirmation/Confirmation.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="/otpConfirmation" element={<Confirmation />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
