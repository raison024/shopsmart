import React, {useState} from 'react'
import './User.css'
import { QrReader } from 'react-qr-reader'
import { Link, useNavigate } from 'react-router-dom'
import BackButton from '../../components/BackButton/BackButton';
  
const Scan = (props) => {
  const [data, setData] = useState('No Result');
  const navigate = useNavigate();

  return (
    <div className="App-header">
      <Link to="/cart">
        <BackButton />
      </Link>
      <h3>Virtual Cart</h3>
      <div style={{ width: '200px' }}>
        <QrReader
          constraints={{ facingMode: 'environment' }}
          onResult={(result, error) => {
            if (result) {
              setData(result?.text);
              navigate("/cart")
            }

            if (!!error) {
              console.info(error);
            }
          }}
          style={{ width: '50%' }}
        />
        <p>{data}</p>

      </div>
    </div>
  );
};

export default Scan;
