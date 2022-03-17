import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";
import useStartImage from '../../../hooks/useStartImage.ts';

import './Car.scss'

const Car = ({ dataCar, login}) => {
  const { img } = useStartImage('images', dataCar.idCar);
  let navigate = useNavigate(); 

  return (
    <div className={login===dataCar.idCar?"car myCar":"car"}
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