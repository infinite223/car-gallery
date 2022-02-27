import React, {useState} from 'react';
import {TextField} from '@mui/material'
import './AddCar.scss'
import { IoCloseOutline } from 'react-icons/io5'
import { AiFillCar } from 'react-icons/ai'
import { motion } from "framer-motion"
import UnstyledInput from '../../../components/CustomInput.js'

const AddCar = () => {
  const [toggleForm, setToggleForm] = useState(false)

  return (
    <>
        <div className='addCar flex' onClick={()=>setToggleForm(true)}>+</div>
        {toggleForm&&
          <motion.div className='addCar-form flex' drag> 
            <div className='addCar__icon-button flex' >
              <div className='addCar__icon-add flex'>ADD</div>
              <div className='addCar__icon-exit flex' onClick={()=>setToggleForm(false)}>
                 <IoCloseOutline size={25}  color='black'/>
              </div>
            </div>
            <AiFillCar size={27} color="rgb(14, 255, 86)"/>
            <h1>Add Your Car</h1>
            <UnstyledInput/>
          </motion.div>
        }
    </>   
  )
}

export default AddCar