import React, {useState, useEffect} from 'react'

import "./CarGallery.scss"
import UploadForm from '../../../comps/UploadForm.js';
import ImageGrid from '../../../comps/ImageGrid.tsx';
import Modal from '../../../comps/Modal.tsx';

import { AiOutlineEdit, IoChevronBackCircleSharp, motion,IoCloseOutline, useNavigate, useLocation } from '../../index'



const CarGallery = ({login,loginUp}) => {
    const location = useLocation();
    let navigate = useNavigate(); 
    const dataCar  = location.state.dataCar;
    const [uploadOption,setUploadOption] = useState(false);
    const [toggleEdit, setToggleEdit] = useState(false);
    const [border, setBorder] = useState("1px solid white");  

    const [selectedImg, setSelectedImg] = useState(null);

    useEffect(() => {
      if(login===dataCar.idCar) {setUploadOption(true)}
    }, [login]);

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

        <div className='CarGallery__menu-edit flex' onClick={()=> !login?setToggleEdit(true):(loginUp(""),setUploadOption(false))}>
           <AiOutlineEdit size={30} color="rgb(14, 255, 86)"/>
        </div>
 
        <h1>{dataCar.model}</h1>  
        <div className='CarGallery__menu-dataCar'>
          <p>Some information about the car</p>
          <text>Engine: {dataCar.engine}</text>
          <text>Power: {dataCar.power}</text>

          {uploadOption&&<div className='CarGallery__menu-upload'>
              <UploadForm car={dataCar.model} idCar={dataCar.idCar}/>                   
          </div>}

        </div>
      </motion.div>  
     <div className='CarGallery__images background-image'>
        <ImageGrid login={login} setSelectedImg={setSelectedImg} idCar={dataCar.idCar}/>
                { selectedImg && (
                  <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
                )}    
      </div>

      {toggleEdit&&<div className='CarGallery__login flex'>
            <text>Type password to your gallery</text> 
            <div className='CarGallery__login-main flex'>
              <input style={{  border: border}} type="password" onChange={
                (x)=>(dataCar.password===x.target.value?(setToggleEdit(false),loginUp(dataCar.idCar),setUploadOption(true)):setBorder("2px solid red"))
                }/>
              <div className='CarGallery__login-exit flex' onClick={()=>setToggleEdit(false)}>
                <IoCloseOutline size={35} color='rgba(34, 40, 51, 0.831)'/>
              </div>
            </div>
        </div>}
    </motion.div>
  )
}

export default CarGallery