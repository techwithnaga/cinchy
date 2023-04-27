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
import PromoCodes from "./pages/admin_pages/promocode_pages/promoCodes/PromoCodes";
import CreatePromoCode from "./pages/admin_pages/promocode_pages/createPromoCode/CreatePromoCode";
import EditPromoCode from "./pages/admin_pages/promocode_pages/editPromoCode/EditPromoCode";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { Navigate } from "react-router-dom";
import Motors from "./pages/admin_pages/motor_pages/motors/Motors";
import Bookings from "./pages/admin_pages/booking_pages/bookings/Bookings";

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

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useContext(AuthContext);

  if (!user || (user.role !== "superadmin" && user.role !== requiredRole)) {
    return <Navigate to="/adminLogin"></Navigate>;
  }

  return children;
};

const UserLoggedInOnlyRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (!user || user.role !== "user") {
    return <Navigate to="/search"></Navigate>;
  }
  return children;
};

const UserRoleCanPass = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (user && user.role === "user") {
    return <Navigate to="/information"></Navigate>;
  }
  return children;
};

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={
                <UserRoleCanPass>
                  <Login />
                </UserRoleCanPass>
              }
            />
            <Route path="/otpConfirmation" element={<Confirmation />}></Route>
            <Route
              path="/information"
              element={
                <UserLoggedInOnlyRoute>
                  <Information />
                </UserLoggedInOnlyRoute>
              }
            />
            <Route path="/search" element={<Search />}></Route>
            <Route path="/mybooking" element={<MyBooking />}></Route>
            <Route path="/aboutus" element={<Aboutus></Aboutus>}></Route>
            <Route path="/faq" element={<Faq></Faq>}></Route>
            <Route
              path="/adminLogin"
              element={<AdminLogin></AdminLogin>}
            ></Route>
            <Route
              path="/adminDashboard"
              element={
                <ProtectedRoute requiredRole="admin">
                  <Admin></Admin>
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/bookingSummary"
              element={
                <UserLoggedInOnlyRoute>
                  <BookingSummary />
                </UserLoggedInOnlyRoute>
              }
            ></Route>
            <Route
              path="/bookingConfirmation"
              element={
                <UserLoggedInOnlyRoute>
                  <BookingConfirmation></BookingConfirmation>
                </UserLoggedInOnlyRoute>
              }
            ></Route>
            <Route path="admin-dashboard">
              <Route
                index
                element={
                  <ProtectedRoute requiredRole="superadmin">
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="bookings"
                element={
                  <ProtectedRoute requiredRole="superadmin">
                    <Bookings />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="motors"
                element={
                  <ProtectedRoute requiredRole="superadmin">
                    <Motors />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="promocodes"
                element={
                  <ProtectedRoute requiredRole="superadmin">
                    <PromoCodes />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="create-promocode"
                element={
                  <ProtectedRoute requiredRole="superadmin">
                    <CreatePromoCode />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="edit-promocode"
                element={
                  <ProtectedRoute requiredRole="superadmin">
                    <EditPromoCode />
                  </ProtectedRoute>
                }
              ></Route>
            </Route>

            <Route path="/*" element={<NotFound></NotFound>}></Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
