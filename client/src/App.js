import "./App.css";
import Home from "./pages/home/Home.jsx";
import Login from "./pages/login/Login.jsx";
import AdminLogin from "./pages/adminLogin/AdminLogin";
import Confirmation from "./pages/confirmation/Confirmation.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Information from "./pages/information/Information";
import Search from "./pages/search/Search";
import MyBooking from "./pages/myBooking/MyBooking";
import Aboutus from "./pages/aboutus/Aboutus";
import BookingSummary from "./pages/bookingSummary/BookingSummary";
import Faq from "./pages/Faq/Faq";
import BookingConfirmation from "./pages/bookingConfirmation/BookingConfirmation";
import { ScrollToTop } from "./components/scrollToTop/ScrollToTop";
import NotFound from "./pages/notFound/NotFound";
import Admin from "./pages/admin/Admin";
import { createTheme, ThemeProvider } from "@mui/material";
import AdminDashboard from "./pages/adminDashboard/AdminDashboard";
import PromoCodes from "./pages/promoCodes/PromoCodes";
import CreatePromoCode from "./pages/createPromoCode/CreatePromoCode";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00332c",
    },
    secondary: { main: "#625E66" },
  },
  typography: {
    fontFamily: "Outfit",
    fontWeightRegular: 400,
    fontWeightBold: 600,
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/otpConfirmation" element={<Confirmation />}></Route>
            <Route path="/information" element={<Information />} />
            <Route path="/search" element={<Search />}></Route>
            <Route path="/mybooking" element={<MyBooking />}></Route>
            <Route path="/aboutus" element={<Aboutus></Aboutus>}></Route>
            <Route path="/faq" element={<Faq></Faq>}></Route>
            <Route
              path="/adminLogin"
              element={<AdminLogin></AdminLogin>}
            ></Route>
            <Route path="/adminDashboard" element={<Admin></Admin>}></Route>
            <Route path="/" element={<Home />} />
            <Route
              path="/bookingSummary"
              element={<BookingSummary></BookingSummary>}
            ></Route>
            <Route
              path="/bookingConfirmation"
              element={<BookingConfirmation></BookingConfirmation>}
            ></Route>
            <Route path="admin-dashboard">
              <Route index element={<AdminDashboard />}></Route>
              <Route path="promocodes" element={<PromoCodes />}></Route>
              <Route path="createedit" element={<CreatePromoCode />}></Route>
            </Route>

            <Route path="/*" element={<NotFound></NotFound>}></Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
