import React,{useState} from 'react'
import {useLocation} from 'react-router-dom';
import "./CarGallery.scss"
import { motion } from "framer-motion"
import { IoChevronBackCircleSharp } from 'react-icons/io5'
import { AiOutlineEdit } from 'react-icons/ai'
import { useNavigate } from "react-router-dom";

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