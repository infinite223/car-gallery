import './App.scss';
import React, {useState} from 'react';
import DotRing from "./comps/DotRing/DotRing";
import MainPage from './container/Pages/MainPage/MainPage.tsx';
import CarGallery from './container/Pages/CarGallery/CarGallery.tsx';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [login, setLogin] = useState("");
  return (
    <div className="Pages">
      <DotRing/>
      <Router>  
      <Routes>      
        <Route path="/" element={ <MainPage login={login}/>} />   
        <Route path="/CarGallery" element={<CarGallery login={login} loginUp={(x=>setLogin(x))}/>} />           
      </Routes>     
    </Router>
    </div>
  );
}

export default App;
