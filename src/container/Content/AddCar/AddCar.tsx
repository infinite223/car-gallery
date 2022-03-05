import React, {useState} from 'react';
import { useMediaQuery } from 'react-responsive'

import { db } from '../../../firebase/config'
import {  addDoc, collection } from "firebase/firestore"; 

import './AddCar.scss'

import { motion, cars, plus, IoCloseOutline, AiFillCar, UnstyledInput } from "../../index"



const AddCar = (props) => {
  const [toggleForm, setToggleForm] = useState(false)
  const {render,model,engine,power,password} = UnstyledInput();
  const [error, setError] = useState("");
  const cityRef = collection(db, 'Car');

  const isTabletOrMobile:boolean = useMediaQuery({ query: '(max-width: 1224px)' })

  const addNewCar = async () => {
    if(model!=="" && password!==""){
      await addDoc(cityRef, 
        {
          model: model,
          engine: engine,
          power: power,
          password: password 
        });
    }else{
      setError("Brak wprowadzonych danych!")
    }
  }
  return (
    <>
        <div className='addCar flex' onClick={()=>setToggleForm(true)}>
          <img className='addCar__icon-cars' src={cars} width="150px" alt="add car"/>
          <img src={plus} width="100px" alt="add car"/>
        </div>
        {toggleForm&&
          <motion.div className='addCar-form flex' drag> 
            <div className='addCar__icon-button flex' >
              <div className='addCar__icon-add flex' onClick={()=>(addNewCar(),props.toggle())}>ADD</div>
              <div className='addCar__icon-exit flex' onClick={()=>(setToggleForm(false),setError(""))}>
                 <IoCloseOutline size={25}  color='black'/>
              </div>
            </div>
            <AiFillCar size={27} color="rgb(14, 255, 86)"/>
            <h1>Add Your Car</h1>
            {render}
            <div style={{color:"red",fontWeight:"800",marginTop:"15px"}}>{error}</div>
          </motion.div>
        }
    </>   
  )
}

export default AddCar