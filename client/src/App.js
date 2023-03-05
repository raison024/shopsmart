import './App.css';
import Login from './pages/Auth/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Register from './pages/Auth/Register';
import UserHome from './pages/UserHome/UserHome';
import Scan from './pages/UserHome/Scan';
import Cart from './pages/UserHome/Cart';

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
      </Routes>
    </BrowserRouter>
  );
}

