import React, {useState} from "react";
 function RegisterUser({onCreate}) {
     const [value, setValue] = useState()
     function submitRegistration(event) {
         event.preventDefault()
         if(value.trim()){
             onCreate(value)
             setValue('')
         }

     }

     return (
         <form onSubmit={submitRegistration}>
             <input placeholder="Імʼя" value={value} onChange={event => setValue(event.target.value)}/>
             <button className='button-submit' type="submit">Зареєструватися</button>
         </form>
     )
 }
 export default RegisterUser