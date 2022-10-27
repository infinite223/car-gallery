import React, {useState, useEffect} from 'react';

import { db } from '../../../firebase/config.tsx'
import {  addDoc, collection } from "firebase/firestore"; 

import './Login.scss'

import { motion, IoCloseOutline, AiFillCar, UnstyledInputLogin, useNavigate } from "../../index"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { Auth } from 'firebase/auth';
import UnstyledInputRegister  from '../../../comps/CoustomInputRegister';

const ButtonsContainer = (props) => {
  const [toggleLoginForm, setToggleLoginForm] = useState(false)
  const [toggleRegisterForm, setToggleRegisterForm] = useState(false)
  const {render,model,engine,power, email, password} = UnstyledInputLogin();
  const {renderReg, emailReg, passwordReg, repeatPasswordReg} = UnstyledInputRegister();
  
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

  const login = () => {
    signInWithEmailAndPassword(getAuth(), email, password)
    .then((s)=>console.log(s))
    .catch((e)=>console.log(e))
  }

  const register = () => {
    createUserWithEmailAndPassword(getAuth(), emailReg, passwordReg)
    .then((s)=>console.log(s))
    .catch((e)=>console.log(e))
  }

  return (
    <>
          <div className='Login'>
            <h3>Car gallery</h3>
            <div  onClick={()=>setToggleLoginForm(true)} className='login__button'>
                Login
            </div> 

            <div onClick={()=>setToggleRegisterForm(true)} className='register__button'>
                Register
            </div> 
          </div>
        {toggleLoginForm&&
          <motion.div layout className='Login-form' drag>    
            <div className='Login__icon-exit flex' onClick={()=>(setToggleLoginForm(false), setError(""))}>
                <IoCloseOutline size={25}  color='white'/>
            </div>   
            <AiFillCar size={27} color="rgb(14, 255, 86)"/>
            <h3>Login to your gallery</h3>
            <div>
              {render}
            </div>

            <div className='Login__icon-button flex'  onClick={()=>login()}>
              Login
            </div>
            <div style={{color:"red",fontWeight:"800",marginTop:"15px"}}>{error}</div>
          </motion.div>
        }
        {toggleRegisterForm&&
          <motion.div layout className='Login-form' drag>    
            <div className='Login__icon-exit flex' onClick={()=>(setToggleRegisterForm(false), setError(""))}>
                <IoCloseOutline size={25}  color='white'/>
            </div>   
            <AiFillCar size={27} color="rgb(14, 255, 86)"/>
            <h3>Login to your gallery</h3>
            <div>
              {renderReg}
            </div>

            <div className='Login__icon-button flex'  onClick={()=>register()}>
              Register
            </div>
            <div style={{color:"red",fontWeight:"800",marginTop:"15px"}}>{error}</div>
          </motion.div>
        }
    </>   
  )
}

export default ButtonsContainer