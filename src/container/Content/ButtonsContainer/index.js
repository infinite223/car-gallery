import React, {useState, useEffect} from 'react';

import { db } from '../../../firebase/config.tsx'
import {  addDoc, collection, getDocs } from "firebase/firestore"; 

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

  const [user, setUser] = useState(null)


  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = getAuth().onAuthStateChanged(
      userAuth => {
        if(userAuth){
          setUser(userAuth)
        }
        else{
          setUser(null)
        }
      }
    )

    return unsubscribe;
  }, [])

  console.log(user)
  let navigate = useNavigate(); 
  const carsRef = collection(db, 'Cars');
  const [cars, setCars] = useState(null)

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
    .then((userAuth)=>navigate('/CarsList', {userAuth}))
    .catch((e)=>console.log(e))
  } 

  const register = () => {
    createUserWithEmailAndPassword(getAuth(), emailReg, passwordReg)
    .then((userAuth)=>navigate('/CarsList', {userAuth}))
    .catch((e)=>console.log(e))
  }

  const getData = async () => {
    const data = await getDocs(carsRef);
    const myCars = await ((data.docs.map((doc)=>({...doc.data(), id:doc.id}))))
    // setCars(myCars.filter((car)=>car.uidUser==user.uid))
    {myCars!=null&&navigate('/CarsList', myCars)}
    // await navigate('/CarsList', {cars: myCars})
  }

  return (
    <>
          <div className='Login'>
            <h5>Car gallery</h5>
            <div  onClick={()=>{user?getData():setToggleLoginForm(true)}} className='login__button'>
              {user?'My account':'Login'}
            </div> 

            <div onClick={()=>{user?setUser(null):setToggleRegisterForm(true)}} className='register__button'>
              {user?'Log Out':'Register'}
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
          <motion.div layout className='Login-form' drag style={{top:"10%"}}>    
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