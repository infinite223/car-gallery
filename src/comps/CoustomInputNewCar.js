import React, {useState} from 'react';
import InputUnstyled from '@mui/base/InputUnstyled';
import { styled } from '@mui/system';


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
  width: 300px;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  background: rgba(1, 1, 93, .6);
  border:none;
  border-radius: 8px;
  padding: 12px 12px;
  margin:10px 0;
  opacity:.7;
  text-align:left;
  outline: none;
  color:"white";

  &:hover {
    
    opacity:1;
  }

  &:focus {
    outline: none;
    
    opacity:1;
  }
`,
);

const CustomInput = React.forwardRef(function CustomInput(props, ref) {
  return (
    <InputUnstyled components={{ Input: StyledInputElement }} {...props} ref={ref} />
  );
});

export default function UnstyledInput() {
  const [model, setModel] = useState("");
  const [engine, setEngine] = useState("");
  const [power, setPower] = useState("");
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState("");

  return {
   model, engine, power,
    render:(
    <>
      <CustomInput onChange={(x)=>setModel(x.target.value)} aria-label="Demo input" placeholder="Type model" />
      <CustomInput onChange={(x)=>setEngine(x.target.value)} aria-label="Demo input" placeholder="Engine car" />
      <CustomInput onChange={(x)=>setPower(x.target.value)} aria-label="Demo input" placeholder="Type power car, (300hp/400Nm)" />    </>
    )
  }
}