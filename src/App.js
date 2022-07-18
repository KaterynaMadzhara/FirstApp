import logo from './img/img.png';
import logo1 from './img/img_1.png';
import logo2 from './img/img_2.png';
import arrow from './img/arrow.png'
import './App.css';
import {useState} from "react";
import RegisterUser from "./components/RegisterUser"

function App() {
    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        setIsActive(!isActive);
    };
function registerUser(name)
{ alert(`Вітаю Вельми шановний, ${name} ви зареєстрованні на найцікавіший івент, що взагалі може бути`)}
  return (
      <body>
    <div className="App">
      <header className="App-header">
          <p> Настав час для супер пупер чьоткої події</p>
        <div className='hover-button'>
            <button class='hover-button--off' >
                <img src={logo} className="App-logo" alt="logo" />
            </button>
            <button className='hover-button--on' onClick={()=> handleClick()}>
                <img src={isActive? logo2: logo1}  className="App-logo" alt="logo"/>
            </button>
            <p>Реєструйся, та готуйся до нереальних емоцій!!11!!!1!!!</p>
        </div>
      </header>
        <div className="wrapper">
                <img className="arrow" src={arrow} alt=""/>
        </div>

        <RegisterUser onCreate={registerUser}/>
    </div>
    </body>
  );
}

export default App;
