import './App.scss';
import { Navbar,Content } from './container/index'
import DotRing from "./components/DotRing/DotRing";
function App() {
  return (
    <div className="App">
      <DotRing/>
      <Navbar/>
      <Content/>
    </div>
  );
}

export default App;
