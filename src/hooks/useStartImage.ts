import { useState, useEffect } from 'react';
import { projectFirestore } from '../firebase/config.tsx';

const useStartImage = (collection, idCar:string) => {
  const [img, setImage] = useState([]);

  useEffect(() => {
    const unsub = projectFirestore.collection(collection)
    
      .orderBy('createdAt', 'desc')
      .onSnapshot(snap => {
        snap.forEach(doc => {
          if(doc.data().idCar===idCar){
            setImage(doc.data().url);
          }
        });
      });

    return () => unsub();
  }, [collection]);
  return { img };
}

export default useStartImage;