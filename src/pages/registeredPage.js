import React from "react";
import {Link, useParams} from "react-router-dom";

function RegisteredPage() {
  const {id} = useParams();

  return (
    <div className='div-registered'>
      <h1 className='h1-registered'>
        Вітаю Вельми шановний, { id } ви зареєстрованні на найцікавіший івент, що взагалі може бути
      </h1>
      <h2 className='h2-registered'>
        <Link to='/' className='back-link'>Повернутись на домашню сторінку</Link>
      </h2>
    </div>
  );
}
export {RegisteredPage};