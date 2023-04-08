import React from 'react'
import './Stores.css'

import SideBar from '../../components/Admin SideBar/SideBar'
import { Chart } from 'react-charts'


function AdminHome() {
  const data = React.useMemo(
    () => [
      {
        label: 'Series 1',
        data: [{ x: 1, y: 10 }, { x: 2, y: 10 }, { x: 3, y: 10 }]
      },
      {
        label: 'Series 2',
        data: [{ x: 1, y: 10 }, { x: 2, y: 10 }, { x: 3, y: 10 }]
      },
      {
        label: 'Series 3',
        data: [{ x: 1, y: 10 }, { x: 2, y: 10 }, { x: 3, y: 10 }]
      }
    ],
    []
  )
 
  const axes = React.useMemo(
    () => [
      { primary: true, type: 'linear', position: 'bottom' },
      { type: 'linear', position: 'left' }
    ],
    []
  )


  return (
    <div className='Admin'>
      <SideBar />
      <div className='AdminStores-container'>
      <div
      style={{
        width: '600px',
        height: '400px'
      }}
    >
      <Chart data={data} axes={axes} />
    </div>
        <div className='Home_image'>
          
        {/* <img src='https://cdn.dribbble.com/users/527152/screenshots/3980452/attachments/910708/maintenance_page_2x.png'></img> */}
        </div>      
      </div>
    </div>
  )
}

export default AdminHome;
