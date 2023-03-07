import './App.css';
import Login from './pages/Auth/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Register from './pages/Auth/Register';
import UserHome from './pages/User/UserHome';
import Scan from './pages/User/Scan';
import Cart from './pages/User/Cart';
import AdminHome from './pages/Admin/AdminLogin';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<UserHome />} />
        <Route path="/scan" element={<Scan />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/adminhome" element={<AdminHome />} />
      </Routes>
    </BrowserRouter>
  );
}

