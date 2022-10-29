import React, { useState } from 'react';
import ProgressBar from './ProgressBar.tsx';
import Compressor from 'compressorjs';

const UploadForm = (props) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const types = ['image/png', 'image/jpeg'];

  
  const handleCompressedUpload = (e) => {
    const image = e.target.files[0];

    if(image && types.includes(image.type)) {
      new Compressor(image, {
        quality: 0.8, // 0.6 can also be used, but its not recommended to go below.
        success: (res) => {
           setFile(res);
           setError('');
          }
      });
     } else {
      setFile(null)
      setError('Please select an image file (png or jpg)');
     }
  };


  return (
    <form className='uploadImage'>
      <label className='flex'>
        <input 
             type="file"
             onChange={(event) => handleCompressedUpload(event)}
        />
        <span>+</span>
      </label>
      <div className="output">
        { error && <div className="error">{ error }</div>}
        { file && <div>{ file.name }</div> }
        { file && <ProgressBar file={file} setFile={setFile} selectedCar={props.selectedCar} /> }
      </div>
    </form>
  );
}

export default UploadForm;