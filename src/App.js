import "./App.css";
import React from "react";
import {Route, Routes} from "react-router-dom";
import {RegisteredPage} from "./pages/registeredPage";
import {Home} from "./pages/home";

function App() {
  return (
    <>
      <Routes>
        <Route path='/registered/:id' element={<RegisteredPage />}/>
        <Route path='*' element={<Home />}/>
      </Routes>
    </>
  );
}

export default App;
