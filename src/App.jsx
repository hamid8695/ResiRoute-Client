import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import NotFound from "./pages/NotFound"
import Login from "./authentication/Login"
import SignUp from "./authentication/SignUp"
import ForgetPass from "./authentication/ForgetPass"
import ResetPass from "./authentication/ResetPass"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify"
import AdminLogin from "./authentication/Admin-login"
import Dashboard from "./Dashboard/Dashboard"
import DashboardHome from "./Dashboard/DashboardHome"
import { useState } from "react"
import AdminSignUp from "./authentication/Admin-signup"
import HotelDetails from "./pages/Details"
import AddResident from "./Dashboard/Add-resident"
import HostDashboardInfo from "./authentication/Host-Dashboard"
import BookingList from "./components/BookingList"
import BookingHotel from "./pages/BookingHotel"
import PaymentSuccess from "./pages/paymentSuccess"

function App() {
  const admin = true;
  const [user, setUser] = useState(true)
  return (
    <>
      {/* {
        admin && <Routes>
          <Route path="/dashboard" element={<Dashboard />} >
            <Route index element={<DashboardHome />} />
            <Route path="add" element={<AddResident />} />
            
          </Route>
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-signup" element={<AdminSignUp />} />
        </Routes>
      } */}
      {
        user &&
        <>

          <Navbar>
          </Navbar>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/admin-signup" element={<AdminSignUp />} />
            <Route path="/host-dashboard" element={<HostDashboardInfo />} />
            <Route path="/payment-success/:id" element={<PaymentSuccess />} />
            <Route path="/booking-info-by-host/:id" element={<BookingList />} />
            <Route path="/forget-pass" element={<ForgetPass />} />
            <Route path="/reset-pass" element={<ResetPass />} />
            <Route path='/hotel-details/:id' element={<HotelDetails />}></Route>
            <Route path='/booking-hotel/:id' element={<BookingHotel />}></Route>

            <Route path="*" element={<NotFound />} />

          </Routes>
        </>
      }

      <ToastContainer />
    </>
  )
}

export default App
