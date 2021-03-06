import { useState, useEffect } from 'react';
import { projectFirestore } from '../firebase/config.tsx';

const useFirestore = (collection, idCar:number) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const unsub = projectFirestore.collection(collection)
    
      .orderBy('createdAt', 'desc')
      .onSnapshot(snap => {
        let documents = []; 
      
        snap.forEach(doc => {
          if(doc.data().idCar===idCar){
          documents.push({...doc.data(), id: doc.id});
          }
        });
        setDocs(documents);
      });

    return () => unsub();
  }, [collection]);

  return { docs };
}

export default useFirestore;