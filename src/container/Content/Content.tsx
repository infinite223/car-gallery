import React, {useEffect,useState} from 'react'
import { Car, AddCar, motion } from '../index'

import './Content.scss';

import { collection, getDocs } from "firebase/firestore";
import { db } from '../../firebase/config'


const Content = () => {
  const [cars, setCars] = useState([]);
  const carsCollectionRef = collection(db, "Car")
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getCars = async () =>{  
      const data = await getDocs(carsCollectionRef);
      setCars(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
      setLoading(true)
    }
    console.log(cars)
    getCars();
  },[toggle]);

  return (
    <>
      {loading?
      <motion.div className='content'
        animate={{opacity:[.6,.65,.7,.8,.9,1]}}
        transition={{ duration: .3 }} 
      >

        {cars.map((car)=>{
          return (
            <Car dataCar={car}/> 
          )
        })}
        
        <AddCar toggle={()=>setToggle(!toggle)}/>  
        
      </motion.div>
      :<div className='loading__cars flex'>
          <div className='loading__spiner flex'></div>
        </div>}    
    </>
  )
}

export default Content