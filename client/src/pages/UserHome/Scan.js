import React, {useState} from 'react'
import { QrReader } from 'react-qr-reader'
import { useNavigate } from 'react-router-dom'
  
const Scan = (props) => {
  const [data, setData] = useState('No Result');
  const navigate = useNavigate();

  return (
    <div className="App-header">
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
