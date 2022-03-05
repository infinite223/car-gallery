import React,{useState} from 'react'
import {useLocation} from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import "./CarGallery.scss"

import { AiOutlineEdit, IoChevronBackCircleSharp, motion } from '../../index'


const CarGallery = () => {
    const location = useLocation();
    let navigate = useNavigate(); 

    const dataCar  = location.state.dataCar;
    const [toggleEdit, setToggleEdit] = useState(false);
    
  return (
    <motion.div className='CarGallery'
    animate={{opacity:[.6,.65,.7,.8,.9,1]}}
    transition={{ duration: .3 }}      
    >
      <motion.div className='CarGallery__menu'>
        <div className='CarGallery__menu-back flex' onClick={()=> navigate("/")}>
          <IoChevronBackCircleSharp size={30} color="rgb(14, 255, 86)"/>
            <h3>back to cars</h3>
        </div>

        <div className='CarGallery__menu-edit flex' onClick={()=> setToggleEdit(true)}>
           <AiOutlineEdit size={30} color="rgb(14, 255, 86)"/>
        </div>

        {toggleEdit&&<div className='CarGallery__login flex'>
            <h3>Type password to your gallery</h3>  
        </div>}
 
        <h1>{dataCar.model}</h1>  
        <div className='CarGallery__menu-dataCar'>
          <p>Some information about the car</p>
          <text>Engine: {dataCar.engine}</text>
          <text>Power: {dataCar.power}</text>
        </div>
      </motion.div>  
      <div className='CarGallery__images'>
        images...  
      </div>  
    </motion.div>
  )
}

export default CarGallery