import React, {useState} from 'react';
import './AddCar.scss'
import { IoCloseOutline } from 'react-icons/io5'
import { AiFillCar } from 'react-icons/ai'
import { motion } from "framer-motion"
import UnstyledInput from '../../../components/CustomInput.js'

import { db } from '../../../firebase/config'
import { doc, addDoc, collection } from "firebase/firestore"; 

const AddCar = (props) => {
  const [toggleForm, setToggleForm] = useState(false)
  const {render,model,engine,power,password} = UnstyledInput();
  const [error, setError] = useState("");
  const cityRef = collection(db, 'Car');

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
        <div className='addCar flex' onClick={()=>setToggleForm(true)}>+</div>
        {toggleForm&&
          <motion.div className='addCar-form flex' drag> 
            <div className='addCar__icon-button flex' >
              <div className='addCar__icon-add flex' onClick={()=>(addNewCar(),props.toggle())}>ADD</div>
              <div className='addCar__icon-exit flex' onClick={()=>setToggleForm(false)}>
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