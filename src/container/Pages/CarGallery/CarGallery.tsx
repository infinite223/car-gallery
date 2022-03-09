import React,{useState} from 'react'

import {useLocation} from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import UploadForm from '../../../comps/UploadForm';
import ImageGrid from '../../../comps/ImageGrid';
import Modal from '../../../comps/Modal';

import "./CarGallery.scss"

import { AiOutlineEdit, IoChevronBackCircleSharp, motion } from '../../index'



const CarGallery = () => {
    const location = useLocation();
    let navigate = useNavigate(); 

    const dataCar  = location.state.dataCar;
    const [uploadOption,setUploadOption] = useState(false)
    const [toggleEdit, setToggleEdit] = useState(false);
    const [border, setBorder] = useState("1px solid white");  

    const [selectedImg, setSelectedImg] = useState(null);

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

        <div className='CarGallery__menu-edit flex' onClick={()=> setToggleEdit(true)}>
           <AiOutlineEdit size={30} color="rgb(14, 255, 86)"/>
        </div>

        {toggleEdit&&<div className='CarGallery__login flex'>
            <text>Type password to your gallery</text>  
            <input style={{  border: border}} type="password" onChange={
              (x)=>(dataCar.password===x.target.value?(setToggleEdit(false),setUploadOption(true)):setBorder("2px solid red"))
              }/>
        </div>}
 
        <h1>{dataCar.model}</h1>  
        <div className='CarGallery__menu-dataCar'>
          <p>Some information about the car</p>
          <text>Engine: {dataCar.engine}</text>
          <text>Power: {dataCar.power}</text>

          {uploadOption&&<div className='CarGallery__menu-upload'>
              <UploadForm car={dataCar.model} />                   
          </div>}

        </div>
      </motion.div>  
      <div className='CarGallery__images'>
        <ImageGrid setSelectedImg={setSelectedImg} car={dataCar.model}/>
                { selectedImg && (
                  <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
                )}    
      </div>  
    </motion.div>
  )
}

export default CarGallery