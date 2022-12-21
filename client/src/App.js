import "./App.css";
import Home from "./pages/home/Home.jsx";
import Login from "./pages/login/Login.jsx";
import Confirmation from "./pages/confirmation/Confirmation.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Information from "./pages/information/Information";
import Search from "./pages/search/Search";
import MyBooking from "./pages/myBooking/MyBooking";
import Aboutus from "./pages/aboutus/Aboutus";
import BookingSummary from "./pages/bookingSummary/BookingSummary";
import Faq from "./pages/Faq/Faq";
import BookingConfirmation from "./pages/bookingConfirmation/BookingConfirmation";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/otpConfirmation" element={<Confirmation />}></Route>
          <Route path="/information" element={<Information />} />
          <Route path="/search" element={<Search />}></Route>
          <Route path="/mybooking" element={<MyBooking />}></Route>
          <Route path="/aboutus" element={<Aboutus></Aboutus>}></Route>
          <Route path="/faq" element={<Faq></Faq>}></Route>
          <Route
            path="/bookingSummary"
            element={<BookingSummary></BookingSummary>}
          ></Route>
          <Route
            path="/bookingConfirmation"
            element={<BookingConfirmation></BookingConfirmation>}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
