import React, { useEffect, useState } from 'react'
import './Stores.css'
import SideBar from '../../components/Admin SideBar/SideBar'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Revenue from '../../assets/Admin/Revenue.png'
import Scan from '../../assets/Admin/Scan.gif'
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useNavigate } from 'react-router-dom';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Axios from 'axios';




function AdminHome() {

  const [popProducts, setPopProducts] = useState([]);
  const [lastFeedback,setLastFeedback]=useState("");

  useEffect(() => {
    Axios.get('http://localhost:3003/api/read_pop_products')
      .then((res) => {
        setPopProducts(res.data);
      })
      .catch((err) => console.log('Error : ' + err));
  }, []);

  useEffect(() => {
    Axios.get('http://localhost:3003/api/recent_fb')
      .then((response) => {
        setLastFeedback(response.data);
        console.log("feedback : " + lastFeedback)
      })
      .catch((error) => {
        console.log(error);
      });
  },{});


  const navigate = useNavigate();

  function goToProd() {
    navigate("/admin_products");
  }
  function goToFeed() {
    navigate("/admin_feedbacks");
  }
  return (
    <div className='Admin'>
      <SideBar />
      <div className='AdminStores-container' style={{ flexDirection: 'row' }}>
        <Card sx={{ minHeight: 400, minWidth: 600 }} style={{ margin: '10px', display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <h4>Overview</h4>
          <div className="AdminCards">
            <Card sx={{ maxWidth: 345, minWidth: 250, maxHeight: 350 }} style={{ marginRight: '10px', borderRadius: 20 }}>
              <CardActionArea>
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {/* Replace the placeholder text with the actual total number of customers */}
                    Revenue: 100
                  </Typography>
                  <h4>1234</h4>
                  <CardMedia
                    component="img"
                    height="140"
                    image={Revenue}
                    alt="green iguana"
                  />
                </CardContent>

              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  <OpenInNewIcon style={{ fontSize: 'medium' }} />
                </Button>
              </CardActions>
            </Card>
            <Card sx={{ maxWidth: 345, minWidth: 250, maxHeight: 350 }} style={{ marginLeft: '10px', borderRadius: 20 }}>
              <CardActionArea>
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {/* Replace the placeholder text with the actual total number of customers */}
                    Customers
                  </Typography>
                  <h4>1234</h4>
                  <CardMedia
                    component="img"
                    height="140"
                    image={Scan}
                    alt="green iguana"
                  />
                </CardContent>
                <div style={{ position: 'relative' }}>
                </div>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  <OpenInNewIcon style={{ fontSize: 'medium' }} />
                </Button>
              </CardActions>
            </Card>

          </div>
        </Card>
        <div className='AdminCardsRight'>
          <Card sx={{ maxWidth: 345, minWidth: 250 }} style={{ marginRight: '10px', borderRadius: 20 ,marginBottom:20}}>
            <CardActionArea>
              <CardContent>
                <h4>Popular Products</h4>
                <div className="RightCardsHead">
                  <p>Products</p>
                  <p>Earnings</p>
                </div>
                <div className="PopProducts">
                  <div className="PopProducts">
                    {popProducts.map((product) => (
                      <div key={product.pid} className="PopProd">
                        <p>{product.pname}</p>
                        <p>&#x20B9;{product.earnings}</p>
                      </div>
                    ))}
                  </div>
                      
                </div>
              </CardContent>

            </CardActionArea>
            <CardActions style={{ justifyContent: 'center' }}>
              <Button size="small" color="primary" onClick={goToProd}>
                All Products
              </Button>
            </CardActions>
          </Card>
          <Card sx={{ maxWidth: 345, minWidth: 250 }} style={{ marginRight: '10px', borderRadius: 20 }}>
            <CardActionArea>
              <CardContent>
                <h4>Latest Feedback</h4>
                <div className="RightCardsHead">
                  <h6 style={{marginLeft:10,marginTop:10}}>Expectation</h6>
                </div>
                <div className="RecentFeedback">
                    <p style={{marginLeft:10}}>{lastFeedback}</p>
                </div>
              </CardContent>

            </CardActionArea>
            <CardActions style={{ justifyContent: 'center' }}>
              <Button size="small" color="primary" onClick={goToFeed}>
                All Feedbacks
              </Button>
            </CardActions>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default AdminHome;
