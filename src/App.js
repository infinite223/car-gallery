import './App.scss';
import DotRing from "./components/DotRing/DotRing";
import MainPage from './container/Pages/MainPage/MainPage.tsx';

function App() {
  return (
    <div className="Pages">
      <DotRing/>
      <MainPage/>
    </div>
  );
}

export default App;
