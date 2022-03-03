import React from 'react'
import {useLocation} from 'react-router-dom';
import "./CarGallery.scss"

const CarGallery = () => {
    const location = useLocation();
    const model :string = location.state.model;
  return (
    <div className='CarGallery flex'>{model}</div>
  )
}

export default CarGallery