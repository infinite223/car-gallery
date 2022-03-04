import photo from '../../../assets/scirocco.png'; 
import React from 'react'
import './Car.scss'
import { useNavigate, useParams } from "react-router-dom";


const Car = ({ dataCar}) => {
  let navigate = useNavigate(); 
  console.log(dataCar)
  return (
    <div className='car'
      style={{ backgroundImage: `url(${photo})` }}
       onClick={()=> navigate("/CarGallery",{state:{dataCar:dataCar}})}
     >
      <div className='car__image'>
        {//<UploadForm/>
        }
      </div>    
      <div className='car__info'>
        <div className='car__info-name'>{dataCar.model}</div>
        <div className='car__info-stats'>{dataCar.engine}</div>
      </div>
    </div>
  )
}

export default Car