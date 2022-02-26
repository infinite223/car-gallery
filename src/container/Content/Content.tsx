import React from 'react'
import { Car, AddCar } from '../index'
import './Content.scss';
const Content = () => {
  return (
    <div className='content'>
      <Car model="Scirocco" engine="2.0 TSI"/> 
      <AddCar/>  
    </div>
  )
}

export default Content