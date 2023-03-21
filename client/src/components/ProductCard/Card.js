import React from 'react'
import './Card.css'
import Shampoo from '../../assets/shampoo.png'

function Card() {
    return (
        <div className='Card'>
            <div className='Card-column' style={{ height: '60%', width: '90%', backgroundColor: '#e9edff', marginTop: '10px', alignSelf: 'center', borderRadius: '10px' }}>
                <img src={Shampoo} height='100%'></img>
            </div>
            <div style={{ width: '90%' }}>
                <h4>TRESemmé Shampoo</h4>
                <h4>Rs. 399</h4>
                <p>4.5</p>
            </div>
        </div>
    )
}

export default Card