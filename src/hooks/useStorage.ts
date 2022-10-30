import { useState, useEffect } from 'react';
import { projectStorage, projectFirestore, timestamp } from '../firebase/config.tsx';
import { arrayUnion, doc } from 'firebase/firestore';
import { updateDoc } from 'firebase/firestore';

const useStorage = (file:File, selectedCar) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    const storageRef = projectStorage.ref(selectedCar.id+"/"+file.name);
    const collectionRef = projectFirestore.collection('Cars');
    const carsRef = doc(projectFirestore, 'Cars', selectedCar.id.toString())
    
    storageRef.put(file).on('state_changed', (snap) => {
      let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
      setProgress(percentage);
    }, (err) => {
      setError(err);
    }, async () => {
      const url = await storageRef.getDownloadURL();
      const createdAt = timestamp();
      await updateDoc(carsRef, {
        image: arrayUnion({url: url, likes: 0})
      }).then((s)=>console.log(s)).catch(e=>console.log(e));
      setUrl(url);
    });
  }, [file]);

  return { progress, url, error };
}

export default useStorage;