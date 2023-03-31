import React from 'react'
import './Stores.css'

import SideBar from '../../components/Admin SideBar/SideBar'


function AdminHome() {
  return (
    <div className='Admin'>
      <SideBar />
      <div className='AdminStores-container'>
        <div className='Home_image'>
        {/* <img src='https://cdn.dribbble.com/users/527152/screenshots/3980452/attachments/910708/maintenance_page_2x.png'></img> */}
        </div>      
      </div>
    </div>
  )
}

export default AdminHome;
