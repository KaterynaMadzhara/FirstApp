import logo from '../img/img.png';
import logo1 from '../img/img_1.png';
import logo2 from '../img/img_2.png';
import arrow from '../img/arrow.png'
import '../App.css';
import React, {useState} from "react";
import {RegisterUser} from "../components/RegisterUser"
import {Route, Routes} from "react-router-dom";
import {RegisteredPage} from "./registeredPage";

function Home() {
  const [isActive, setIsActive] = useState(false);
  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
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
        </div>
        <p>Реєструйся, та готуйся до нереальних емоцій!!11!!!1!!!</p>
      </header>
      <div className="wrapper">
        <img className="arrow" src={arrow} alt=""/>
      </div>
      <RegisterUser onCreate={RegisteredPage}/>
      <Routes>
        <Route path="/registered/" element={<RegisteredPage />}/>
      </Routes>
    </div>
  );
}

export {Home};
