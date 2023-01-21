import "./App.css";
import Home from "./pages/home/Home.jsx";
import Login from "./pages/login/Login.jsx";
import Confirmation from "./pages/confirmation/Confirmation.jsx";
import { HashRouter, Routes, Route } from "react-router-dom";
import Information from "./pages/information/Information";
import Search from "./pages/search/Search";
import MyBooking from "./pages/myBooking/MyBooking";
import Aboutus from "./pages/aboutus/Aboutus";
import BookingSummary from "./pages/bookingSummary/BookingSummary";
import Faq from "./pages/Faq/Faq";
import BookingConfirmation from "./pages/bookingConfirmation/BookingConfirmation";
import { ScrollToTop } from "./components/scrollToTop/ScrollToTop";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/otpConfirmation" element={<Confirmation />}></Route>
          <Route path="/information" element={<Information />} />
          <Route path="/search" element={<Search />}></Route>
          <Route path="/mybooking" element={<MyBooking />}></Route>
          <Route path="/aboutus" element={<Aboutus></Aboutus>}></Route>
          <Route path="/faq" element={<Faq></Faq>}></Route>
          <Route path="/" element={<Home />} />
          <Route
            path="/bookingSummary"
            element={<BookingSummary></BookingSummary>}
          ></Route>
          <Route
            path="/bookingConfirmation"
            element={<BookingConfirmation></BookingConfirmation>}
          ></Route>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
