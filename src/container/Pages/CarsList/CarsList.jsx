import React, {useState, useEffect} from 'react'
import UploadForm from '../../../comps/UploadForm.js';
import ImageGrid from '../../../comps/ImageGrid.tsx';
import Modal from '../../../comps/Modal.tsx';
import UnstyledInputNewCar  from '../../../comps/CoustomInputNewCar';

import { db } from '../../../firebase/config.tsx'
import { addDoc, collection, getDocs } from "firebase/firestore"; 

import { AiOutlineEdit, IoChevronBackCircleSharp, motion,IoCloseOutline, useNavigate, useLocation } from '../../index'
import { AiFillCar } from '../../index';
import { getAuth } from 'firebase/auth';
import { setSourceMapRange } from 'typescript';
import "./CarsList.scss"

const CarsList = ({login,loginUp}) => {
    const {render, model, engine, power} = UnstyledInputNewCar()
    const [error, setError] = useState("");
    const [user, setUser] = useState(null)
    const [toggleNewCarForm, setToggleNewCarForm] = useState(false)
    const location = useLocation();
    const cars  = location.state;
    let navigate = useNavigate(); 
    const [selectedCar, setSelectedCar] = useState(cars[0]?cars[0]:null)

    console.log(cars)
    const [uploadOption,setUploadOption] = useState(false);
    const [toggleEdit, setToggleEdit] = useState(false);
    // const [cars, setCars] = useState(null)

    const [selectedImg, setSelectedImg] = useState(null);
    const carsRef = collection(db, 'Cars');

    useEffect(() => {
      const unsubscribe = getAuth().onAuthStateChanged(
        userAuth => {
          if(userAuth){
            console.log(userAuth)
            setUser(userAuth)
          }
          else{
            navigate("/")
          }
        }
      )

      return unsubscribe;
    }, [])

    // useEffect(() => {
    //     const getData = async () => {
    //         const data = await getDocs(carsRef);
    //         const myCars = ((data.docs.map((doc)=>({...doc.data(), id:doc.id}))))
    //         console.log(myCars)
    //         setCars(myCars.filter((car)=>car.uidUser==user.uid))
    //     }

    //     getData()
    // }, [])
    


    const newCar = async () => {
        console.log(model, engine, power)
        if(model!==""){
            await addDoc(carsRef, 
              {
                uidUser: user.uid,
                model: model,
                engine: engine,
                power: power,
              });
              setToggleNewCarForm(false)
          }else{
            setError("Brak wprowadzonych danych!")
          }
    }

  return (
    <motion.div className='CarGallery'
      animate={{opacity:[.6,.65,.7,.8,.9,1]}}
      transition={{ duration: .3 }}      
    >
      <motion.div className='CarGallery__menu'>
        <div className='CarGallery__menu-back flex' onClick={()=> navigate("/")}>
          <IoChevronBackCircleSharp size={25} color="rgb(14, 255, 86)"/>
            <h3>back to main page</h3>
        </div>

        <div className='CarGallery__menu-edit flex' onClick={()=> setToggleNewCarForm(true)}>
           <AiOutlineEdit size={26} color="rgb(14, 255, 86)"/>
        </div>
        <h3 style={{textAlign:'left', width:"85%", marginTop:"100px", color:"gray"}}>My cars in gallery</h3> 
        {cars?.map((car)=> {
          return (
              <div className='CarGallery__car' onClick={()=>setSelectedCar(car)}>
                 <div className='image'></div>
                 <div className='car__informations'>
                   <div className='header__info'>{car.model} <small>{car.engine}</small></div>
                   <div> <i>Car power: </i>{car.power}</div>
                 </div>    
              </div>         
          )
        })}
 
        {/* <h1>{dataCar.model}</h1>   */}
        {/* <div className='CarGallery__menu-dataCar'> */}

          {/* <text>Engine: {dataCar.engine}</text> */}
          {/* <text>Power: {dataCar.power}</text> */}

          {uploadOption&&<div className='CarGallery__menu-upload'>
              {/* <UploadForm car={dataCar.model} idCar={dataCar.idCar}/>                    */}
          </div>}

        {/* </div> */}
      </motion.div>  
     <div className='CarGallery__images background-image'>
          <div style={{marginLeft:'20px'}}>
              <UploadForm selectedCar={selectedCar}/>                   
          </div>
        {/* <ImageGrid login={login} setSelectedImg={setSelectedImg} idCar={dataCar.idCar}/> */}
                { selectedImg && (
                  <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
                )}    
      </div>

      {toggleNewCarForm&&
          <motion.div layout className='Login-form' drag style={{top:"10%", left:'39%'}}>    
            <div className='Login__icon-exit flex' onClick={()=>(setToggleNewCarForm(false), setError(""))}>
                <IoCloseOutline size={25}  color='white'/>
            </div>   
            <AiFillCar size={27} color="rgb(14, 255, 86)"/>
            <h3>Add car to your gallery</h3>
            <div>
              {render}
            </div>

            <div className='Login__icon-button flex'  onClick={()=>newCar()}>
              Add
            </div>
            <div style={{color:"red",fontWeight:"800",marginTop:"15px"}}>{error}</div>
          </motion.div>
        }
    </motion.div>
  )
}

export default CarsList