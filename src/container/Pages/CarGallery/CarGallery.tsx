import React,{useState} from 'react'

import {useLocation} from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import { storage, db } from "../../../firebase/config";

import "./CarGallery.scss"

import { AiOutlineEdit, IoChevronBackCircleSharp, motion } from '../../index'



const CarGallery = () => {
    const location = useLocation();
    let navigate = useNavigate(); 

    const dataCar  = location.state.dataCar;
    const [uploadOption,setUploadOption] = useState(false)
    const [toggleEdit, setToggleEdit] = useState(false);
    const [border, setBorder] = useState("1px solid white");  
    const [image, setImage] = useState(null);

  const [url, setUrl] = useState("");
  //const [progress, setProgress] = useState(0);


  function handleChange(e){
    e.preventDefault();
    let pickedFile;
    if (e.target.files && e.target.files.length>0) {
      pickedFile = e.target.files[0];
      setImage(pickedFile)
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();
    const uploadTask = storage.ref(`images`)
   .child("image1")
   .put(image);
   uploadTask.on(
     "state chansge",
     (snapshot) =>{
       let progress=((snapshot.bytesTransferred/snapshot.totalBytes)*100)
       console.log(progress)
     },
     (err)=>{
       console.log(err)
     }   
   )

  };
   

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
        </div>

              {uploadOption&&<div className='CarGallery__menu-upload'>
              <input type="file" onChange={handleChange} />
               <button onClick={handleUpload}>Upload</button>
             
              </div>}

      </motion.div>  
      <div className='CarGallery__images'>
        images...  
      </div>  
    </motion.div>
  )
}

export default CarGallery