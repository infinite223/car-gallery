import React, {useEffect,useState} from 'react'
import { Car, AddCar, motion } from '../index'

import './Content.scss';

import { collection, getDocs } from "firebase/firestore";
import { db } from '../../firebase/config.tsx'


const Content = () => {
  const [cars, setCars] = useState([]);
  const carsCollectionRef = collection(db, "Car")
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getCars = async () =>{  
      const data = await getDocs(carsCollectionRef);
      setCars(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
      await setLoading(true)
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
        <h1><text className='content__h1-cars'>{cars.length}</text> Cars in Gallery</h1>
        <div className='content__cars flex'>
          {cars.map((car)=>{
            return (
              <Car dataCar={car}/> 
            )
          })}
        </div>
        <AddCar toggle={()=>setToggle(!toggle)}/>  
        
      </motion.div>
      :<div className='loading__cars flex'>
          <div className='loading__spiner flex'></div>
        </div>}    
    </>
  )
}

export default Content