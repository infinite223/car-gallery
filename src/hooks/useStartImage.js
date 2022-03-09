import { useState, useEffect } from 'react';
import { projectFirestore } from '../firebase/config';

const useStartImage = (collection, car) => {
  const [img, setImage] = useState([]);

  useEffect(() => {
    const unsub = projectFirestore.collection(collection)
    
      .orderBy('createdAt', 'desc')
      .onSnapshot(snap => {
        let documents = []; 
        snap.forEach(doc => {
          if(doc.data().car===car){
            setImage(doc.data().url);
          }
        });
      });

    return () => unsub();
  }, [collection]);

  return { img };
}

export default useStartImage;