import React, {useState} from 'react';
import InputUnstyled from '@mui/base/InputUnstyled';
import { styled } from '@mui/system';
import { db } from '../firebase/config'
import { doc, setDoc } from "firebase/firestore"; 

const blue = {
  100: '#DAECFF',
  200: '#80BFFF',
  400: '#3399FF',
  600: '#0072E5',
};

const grey = {
  50: '#F3F6F9',
  100: '#E7EBF0',
  200: '#E0E3E7',
  300: '#CDD2D7',
  400: '#B2BAC2',
  500: '#A0AAB4',
  600: '#6F7E8C',
  700: '#3E5060',
  800: '#2D3843',
  900: '#1A2027',
};

const StyledInputElement = styled('input')(
  ({ theme }) => `
  width: 320px;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  background: rgb(150, 174, 231);
  border: 1px solid white;
  border-radius: 8px;
  padding: 12px 12px;
  margin:15px;
  opacity:.7;
  text-align:center;

  &:hover {
    background: ${theme.palette.mode === 'dark' ? '' : grey[100]};
    border-color: rgb(14, 255, 86);
    opacity:1;
  }

  &:focus {
    outline: 1.5px solid rgb(14, 255, 86);
    background: ${theme.palette.mode === 'dark' ? '' : grey[100]};
    opacity:1;
  }
`,
);

const CustomInput = React.forwardRef(function CustomInput(props, ref) {
  return (
    <InputUnstyled components={{ Input: StyledInputElement }} {...props} ref={ref} />
  );
});

export default function UnstyledInput(props) {
  const [model, setModel] = useState(null);
  const [engine, setEngine] = useState(null);
  const [power, setPower] = useState(null);
  const [password, setPassword] = useState(null);
  
  if(props.addCar){

    const cityRef = doc(db, 'Car', model);
    setDoc(cityRef, 
       { model: model,engine: engine,power: power,password: password });
  }
  return (
    <>
      <CustomInput onChange={(x)=>setModel(x.target.value)} aria-label="Demo input" placeholder="Type model car..." />
      <CustomInput onChange={(x)=>setEngine(x.target.value)} aria-label="Demo input" placeholder="Engine car..." />
      <CustomInput onChange={(x)=>setPower(x.target.value)} aria-label="Demo input" placeholder="Car power  (HP/Nm)" />
      <CustomInput onChange={(x)=>setPassword(x.target.value)} aria-label="Demo input" placeholder="Password to gallery" />
    </>
  )
}