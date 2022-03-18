import React, {useState, useEffect} from 'react';

import { db } from '../../../firebase/config.tsx'
import {  addDoc, collection } from "firebase/firestore"; 
import { useNavigate } from "react-router-dom";

import './AddCar.scss'

import { motion, IoCloseOutline, AiFillCar, UnstyledInput } from "../../index"



const AddCar = (props) => {
  const [toggleForm, setToggleForm] = useState(false)
  const {render,model,engine,power,password} = UnstyledInput();
  
  const dataCar ={
    idCar:props.lastId.length*2,
    model: model,
    engine: engine,
    power: power,
    password: password 
  }

  const [error, setError] = useState("");

  let navigate = useNavigate(); 
  const cityRef = collection(db, 'Car');

  const addNewCar = async () => {
    if(model!=="" && password!==""){
      await addDoc(cityRef, 
        {
          idCar:props.lastId.length*2,
          model: model,
          engine: engine,
          power: power,
          password: password 
        });
        navigate("/CarGallery",{state:{dataCar:dataCar}})
    }else{
      setError("Brak wprowadzonych danych!")
    }
  }

  const [scrolled,setScrolled]=React.useState(false);
  const handleScroll=() => {
    const offset=window.scrollY;
    if(offset > 200 ){
      setScrolled(true);
    }
    else{
      setScrolled(false);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll',handleScroll)
  })
  let navbarClasses=['addCar'];
  if(scrolled){
    navbarClasses.push('scrolled');
  }

  return (
    <>
        <motion.div className='addCar flex' onClick={()=>setToggleForm(true)}
             whileHover={{
              width: 150,
              fontSize:"40px",
              color:"#4e5052",
              borderRadius:"20px",
              transition: { duration: .2 },
            }}
            whileTap={{ scale: 2.9 }}
        >
          <text>New car</text>
        </motion.div>
        {toggleForm&&
          <motion.div layout className='addCar-form flex' drag> 
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