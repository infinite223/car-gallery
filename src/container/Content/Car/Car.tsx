import React from 'react'
import { useNavigate } from "react-router-dom";
import useStartImage from '../../../hooks/useStartImage.ts';

import './Car.scss'

const Car = ({ dataCar}) => {
  const { img } = useStartImage('images', dataCar.model);
  let navigate = useNavigate(); 
  console.log(img)
  return (
    <div className='car'
      style={{ backgroundImage: `url(${img})` }}
       onClick={()=> navigate("/CarGallery",{state:{dataCar:dataCar}})}
     > 
      <div className='car__info'>
        <div className='car__info-name'>{dataCar.model}</div>
      </div>
    </div>
  )
}

export default Car