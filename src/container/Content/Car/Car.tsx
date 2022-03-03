import React from 'react'
import './Car.scss'
import { useNavigate, useParams } from "react-router-dom";

const Car = ({ model, engine }) => {
  let navigate = useNavigate(); 
 
  return (
    <div className='car' onClick={()=> navigate("/CarGallery",{state:{model:model}})}>
      <div className='car__image'>
        {//<UploadForm/>
        }
      </div>    
      <div className='car__info'>
        <div className='car__info-name'>{model}</div>
        <div className='car__info-stats'>{engine}</div>
      </div>
    </div>
  )
}

export default Car