import './MainPage.scss';
import { Navbar,Content } from '../../index'

function MainPage({login}) {
  return (
    <div className="App">
      <Navbar/>
      <Content login={login}/>
    </div>
  );
}

export default MainPage;
