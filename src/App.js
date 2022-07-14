import logo from './img.png';
import logo1 from './img_1.png';
import logo2 from './img_2.png';
import './App.css';
import {useState} from "react";

function App() {
    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        setIsActive(!isActive);
    };

  return (
    <div className="App">
      <header className="App-header">
        <div className='hover-button'>
            <button class='hover-button--off'>
                <img src={logo} className="App-logo" alt="logo" />
            </button>
            <button className='hover-button--on' onClick={()=> handleClick()}>
                <img src={isActive? logo2: logo1}  className="App-logo" alt="logo"/>
            </button>
        </div>
      </header>
    </div>
  );
}

export default App;
