import React from 'react';
import useFirestore from '../hooks/useFirestore.ts';
import { db } from '../firebase/config.tsx'
import {  doc, updateDoc  } from "firebase/firestore"; 
import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';


const ImageGrid = ({ setSelectedImg, idCar, login }) => {
  const { docs } = useFirestore('images', idCar);

     async function UpdataLikes(doca) {
      if(login&&login!==idCar){
        let imagesRef = doc(db, "images", doca.id);
        await updateDoc(imagesRef,!doca.likes.find(x=>x===login)?{
          likes:[...doca.likes,login]
        }:{
          likes:doca.likes.filter(item => item !== login)
        }
        )
      }
     }
     const dateImg = (doc) =>{
      var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      var date = new Date(doc.createdAt.seconds*1000);
      var year = date.getFullYear();
      var month = months[date.getMonth()];
      var day = date.getDate();
       console.log(year)
        return (
          <div>{day} {month} {year}</div>
        )
     }
  
  return (
    <div className="img-grid">
      {docs && docs.map(doc => (
        <motion.div className="img-wrap" key={doc.id}>
          <motion.img src={doc.url} 
           layout
           whileHover={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            onClick={() => setSelectedImg(doc.url)}
          />
          <div className='heart-icon flex' onClick={()=>(UpdataLikes(doc))}>
            <motion.div 
            whileTap={login!==idCar&&{scale:[1,2,6,4, 1]}}
            transition={{ duration: .3 }}  
            className='heart-icon-fa'>
              <FaHeart  color={doc.likes&&doc.likes.length>0&&(doc.likes.find(x=>x===login)?"red":"white")} size={21}/>
            </motion.div>
            <text className='flex'>{doc.likes&&doc.likes.length&&doc.likes.filter(x => x!==null).length}</text>
          </div>

          <div className='date-img'>{dateImg(doc)}</div>
        </motion.div>
      ))}
    </div>  
  )
}

export default ImageGrid;