import React, {useEffect,useState} from 'react'
import { Car, AddCar } from '../index'
import './Content.scss';
import { collection,query, getDocs, doc } from "firebase/firestore";
import { db } from '../../firebase/config'

const Content = () => {
  const [cars, setCars] = useState([]);
  const carsCollectionRef = collection(db, "Car")
  const [toggle, setToggle] = useState(false)

  useEffect(() => {
    const getCars = async () =>{  
      const data = await getDocs(carsCollectionRef);
      setCars(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
    }
    console.log(cars)
    getCars();
  },[toggle]);

  return (
    <div className='content'>
      {cars.map((car)=>{
        return (
          <Car model={car.model} engine={car.engine}/> 
        )
      })}     
      
      <AddCar toggle={()=>setToggle(!toggle)}/>  
    </div>
  )
}

export default Content