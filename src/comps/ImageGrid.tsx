import React, {useEffect, useState} from 'react';
import firebase from 'firebase/compat/app';
import useFirestore from '../hooks/useFirestore.ts';
import { db } from '../firebase/config.tsx'
import {  doc, updateDoc,collection  } from "firebase/firestore"; 
import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';


const ImageGrid = ({ setSelectedImg, idCar, login }) => {
  const { docs } = useFirestore('images', idCar);
  const [like, setLike] = useState(false);

     async function UpdataLikes(doca) {
      if(login&&login!==idCar){
        let imagesRef = doc(db, "images", doca.id);
        await updateDoc(imagesRef,like?{
          likes:[...doca.likes,login]
        }:{
          likes:doca.likes.filter(item => item !== login)
        }
        )
      }
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
          <div className='heart-icon flex'>
            <FaHeart onClick={()=>(UpdataLikes(doc),setLike(!like))} color={doc.likes&&doc.likes.length>0&&(doc.likes.find(x=>x==login)?"red":"white")} size={23}/>
            <text className='flex'>{doc.likes&&doc.likes.length&&doc.likes.filter(x => x!==null).length}</text>
          </div>
        </motion.div>
      ))}
    </div>  
  )
}

export default ImageGrid;