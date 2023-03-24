import React from 'react'
import './AdminHome.css'
import { Routes, Route } from 'react-router-dom';

import SideBar from '../../components/Admin SideBar/SideBar'
import Stores from '../../components/Admin SideBar/Stores.js'
import Products from '../../components/Admin SideBar/Products'
import  Customers  from '../../components/Admin SideBar/Customers'
import Payments  from '../../components/Admin SideBar/Payments'

function AdminHome() {
  return (
    <div className='admin-home'>
      <SideBar />
      <div className='admin-content'>
        <p>hello</p>
      </div>
    </div>
  )
}

export default AdminHome;
