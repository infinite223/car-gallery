import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";
import useStartImage from '../../../hooks/useStartImage.ts';

import './Car.scss'

const Car = ({ dataCar, login}) => {
  let navigate = useNavigate(); 

  return (
    <div className={"car"}
      style={{ backgroundImage: `url(${dataCar.image?.[0].url})` }}
       onClick={()=> navigate("/CarGallery",{state:{dataCar:dataCar}})}
     >  
      <div className='car__info'>
        <div className='car__info-name'>{dataCar.model}</div>
      </div>
    </div>
  )
}

export default Car