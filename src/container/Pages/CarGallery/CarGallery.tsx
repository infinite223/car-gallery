import React, {useState, useEffect} from 'react'

import "./CarGallery.scss"
import UploadForm from '../../../comps/UploadForm.js';
import ImageGrid from '../../../comps/ImageGrid.tsx';
import Modal from '../../../comps/Modal.tsx';

import { AiOutlineEdit, IoChevronBackCircleSharp, motion,IoCloseOutline, useNavigate, useLocation } from '../../index'

import { getAuth } from 'firebase/auth';
import userEvent from '@testing-library/user-event';

const CarGallery = () => {
    const location = useLocation<any>();
    const [user, setUser] = useState<any>(null)
    let navigate = useNavigate(); 
    const car:any = location.state.dataCar;
    console.log(car.image)
    const [uploadOption,setUploadOption] = useState(false);
    const [toggleEdit, setToggleEdit] = useState(false);
    const [border, setBorder] = useState("1px solid white");  

    const [selectedImg, setSelectedImg] = useState(null);

    useEffect(() => {
      const unsubscribe = getAuth().onAuthStateChanged(
        userAuth => {
          if(userAuth){
            setUser(userAuth)
          }
        }
      )

      return unsubscribe;
    }, [])

  return (
    <motion.div className='CarGallery'
      animate={{opacity:[.6,.65,.7,.8,.9,1]}}
      transition={{ duration: .3 }}      
    >
      <motion.div className='CarGallery__menu'>
        <div className='CarGallery__menu-back flex' onClick={()=> navigate("/")}>
          <IoChevronBackCircleSharp size={30} color="rgb(14, 255, 86)"/>
            <h3>back to cars</h3>
        </div>
        
        <div className='CarGallery__menu-dataCar' style={{marginTop:"90px"}}>
          <p>Some information about the car</p>
          <text>Engine: {car.engine}</text>
          <text>Power: {car.power}</text>
        </div>
      </motion.div>  
      <div className='CarGallery__images background-image'>      
              {car.image &&<ImageGrid setSelectedImg={setSelectedImg} images={car.image} userAuthUid={user?user.uid:''}/>}
                { selectedImg && (
                  <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
                )}    
          
      </div>

      {toggleEdit&&<div className='CarGallery__login flex'>
            <text>Type password to your gallery</text> 
            <div className='CarGallery__login-main flex'>
              <div className='CarGallery__login-exit flex' onClick={()=>setToggleEdit(false)}>
                <IoCloseOutline size={35} color='rgba(34, 40, 51, 0.831)'/>
              </div>
            </div>
        </div>}
    </motion.div>
  )
}

export default CarGallery