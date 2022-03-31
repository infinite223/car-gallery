import React, {useEffect,useState} from 'react'
import { Car, AddCar, motion, FaArrowDown } from '../index'
import useBestImage from '../../hooks/useBestImage.ts'
import { BestPhotosBlock } from "./BestPhotosBlock/BestPhotosBlock"
import './Content.scss';

import { collection, getDocs } from "firebase/firestore";
import { db } from '../../firebase/config.tsx'


const Content = ({login}) => {
  const [cars, setCars] = useState([]);
  const carsCollectionRef = collection(db, "Car")
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(false);

  const { bestImg } = useBestImage('images');

  useEffect(() => {
    const getCars = async () =>{  
      const data = await getDocs(carsCollectionRef);
      setCars(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
      await setLoading(true)
    }
    getCars();
  },[toggle]);

  return (
    <>
      {loading?
      <motion.div className='content background-image'
        animate={{opacity:[.6,.65,.7,.8,.9,1]}}
        transition={{ duration: .3 }} 
      >

        <div className='content__bestImage flex'>
          <h1 className='flex'>Best photo in gallery</h1>
          {//<img className='bestImage flex' src={bestImg}/>
}
          <BestPhotosBlock/>
          <div className='icon flex'><FaArrowDown size={55} color='white'/></div>
        </div>
        <div className='content__gallery flex'>
          <h1><text className='content__h1-cars'>{cars.length}</text> Cars in Gallery</h1>
          <div className='content__cars flex'>
            {cars.map((car)=>{
              return (
                <Car dataCar={car} login={login}/> 
              )
            })}
          </div>
          <AddCar lastId={cars.map((car)=>{return car.idCar})}toggle={()=>setToggle(!toggle)}/>  
        </div>
      </motion.div>
      :<div className='loading__cars flex'>
          <div className='loading__spiner flex'></div>
        </div>}    
    </>
  )
}

export default Content