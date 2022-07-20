import React from "react";
import {Link, useParams}
    from "react-router-dom";
import background from '../img/confetee.png'

function RegisteredPage() {
    const {id} = useParams();

    return (
        <div style={{
            backgroundImage: `url(${background})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            width: '100vw',
            height: '100vh'}}>
            <h1 style={{
                textAlign: 'center',
                position: 'fixed',
                top: '30%',
                left: '10%'
            }}>
                Вітаю Вельми шановний, { id } ви зареєстрованні на найцікавіший івент, що взагалі може бути
            </h1>
            <h2 style={{
                textAlign: 'center',
                position: 'fixed',
                top: '40%',
                left: '40%'
            }}>
                <Link to='/' style={{color: "rgb(119, 120, 110)", background: 'yellow'}}>Повернутись на домашню сторінку</Link>
            </h2>
        </div>
    );
}
export {RegisteredPage};