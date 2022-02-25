import React from 'react'
import UploadForm from '../../../components/UpLoadForm'
import './Car.scss'

const Car = ({ model , engine }) => {
  return (
    <div className='car'>
      <div className='car__image'>
        <UploadForm/>
      </div>    
      <div className='car__info'>
        <div className='car__info-name'>{model}</div>
        <div className='car__info-stats'>{engine}</div>
      </div>
    </div>
  )
}

export default Car