import './App.scss';
import DotRing from "./comps/DotRing/DotRing";
import MainPage from './container/Pages/MainPage/MainPage.tsx';
import CarGallery from './container/Pages/CarGallery/CarGallery.tsx';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="Pages">
      <DotRing/>
      <Router>  
      <Routes>      
        <Route path="/" element={ <MainPage/>} />   
        <Route path="/CarGallery" element={<CarGallery/>} />           
      </Routes>     
    </Router>
    </div>
  );
}

export default App;
