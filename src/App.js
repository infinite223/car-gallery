import './App.scss';
import React, {useState} from 'react';
import DotRing from "./comps/DotRing/DotRing";
import MainPage from './container/Pages/MainPage/MainPage.tsx';
import CarGallery from './container/Pages/CarGallery/CarGallery.tsx';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyCarsGallery from './container/Pages/MyCarsGallery/MyCarsGallery';

function App() {
  const [login, setLogin] = useState("");
  return (
    <div className="Pages">
      <DotRing/>
      <Router>  
      <Routes>      
        <Route path="/" element={ <MainPage/>} />   
        <Route path="/CarGallery" element={<CarGallery/>} />  
        <Route path="/MyCarsGallery" element={<MyCarsGallery/>} />          
      </Routes>     
    </Router>
    </div>
  );
}

export default App;
