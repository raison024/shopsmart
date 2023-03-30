import './App.css';
import Login from './pages/Auth/Login';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home/Home';
import Register from './pages/Auth/Register';
import UserHome from './pages/User/UserHome';
import Scan from './pages/User/Scan';
import Cart from './pages/User/Cart';
import AdminLogin from './pages/Admin/AdminLogin';
import AdminHome  from './pages/Admin/AdminHome';
import Stores from '../src/components/Admin SideBar/Stores'
import Products from '../src/components/Admin SideBar/Products'
import Customers from '../src/components/Admin SideBar/Customers'
import Payments from '../src/components/Admin SideBar/Payments'
import AddProduct from './components/Admin SideBar/AddProduct';
import UpdateProduct from './components/Admin SideBar/UpdateProduct';
import Categories from './components/Admin SideBar/Categories';





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
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/adminhome" element={<AdminHome/>}/>
        <Route exact path="/admin_stores" element={<Stores />} />
        <Route exact path="/admin_products" element={<Products />} />
        <Route exact path="/admin_products/add" element={<AddProduct />} />
        <Route exact path="/admin_products/update/:pid" element={<UpdateProduct />} />
        <Route exact path="/admin_customers" element={<Customers />} />
        <Route exact path="/admin_payments" element={<Payments />} />
        <Route exact path="/admin_category" element={<Categories/>} />



      </Routes>
    </BrowserRouter>
  );
}

