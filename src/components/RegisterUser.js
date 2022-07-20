import React, {useState} from "react";

import {Link}
    from "react-router-dom";

 function RegisterUser({onCreate},) {
     const [value, setValue] = useState()
     function submitRegistration(event) {
         event.preventDefault()
         if(value.trim()){
             onCreate(value)
             setValue('')
         }
     }

     return (<>
         <form onSubmit={ submitRegistration }>
             <input placeholder="Імʼя" value={value} onChange={event => setValue(event.target.value)}/>
             <Link to={`/registered/${value}`}>
                 <button className='button-submit' type="submit">Зареєструватися</button>
             </Link>

         </form>
         </>
     )
 }
 export default RegisterUser