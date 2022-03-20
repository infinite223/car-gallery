import { useState, useEffect } from 'react';
import { projectFirestore } from '../firebase/config.tsx';

const useBestImage = (collection) => {
  const [bestImg, setBestImg] = useState();

  useEffect(() => {
    const unsub = projectFirestore.collection(collection)
    
      .orderBy('likes')
      .onSnapshot(snap => {
        let bestImage = 0; 
        snap.forEach(doc => {  
          if(doc.data().likes.filter(x => x!=null).length>bestImage){
            bestImage = doc.data().likes.filter(x => x!=null).length;
            setBestImg(doc.data().url)
          }
        });     
      });

    return () => unsub();
  }, [collection]);
  return { bestImg };
}

export default useBestImage;