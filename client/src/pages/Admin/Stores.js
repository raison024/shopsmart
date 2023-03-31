import React ,{useState} from 'react'
import SideBar from '../../components/Admin SideBar/SideBar'
import './Stores.css'
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';


function Stores() {
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const handleMapLoad = () => {
    setIsMapLoaded(true);
  };
  return (
    
    <div className='Admin'>
<SideBar/>
      <div className="AdminStores-container">
      {!isMapLoaded && (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress />
          </Box>
        )}
      <iframe src="https://my.atlistmaps.com/map/a0ca7953-72be-4c91-893f-405a7fbc8fe7?share=true" allow="geolocation 'self' https://my.atlistmaps.com" width="70%" height="70%" frameborder="0" scrolling="no" allowfullscreen onLoad={handleMapLoad}></iframe>
      </div>

    </div>
  )
}

export default Stores