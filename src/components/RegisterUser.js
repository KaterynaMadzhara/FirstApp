import React, {useEffect, useState} from "react";
import { useNavigate} from "react-router-dom";
function RegisterUser({onCreate}) {
  const [nameValue, setNameValue] = useState()
  const [error, setError] = useState({})
  const [isSubmit, setIsSubmit] = useState(false)
  const navigate = useNavigate()

  const handleRegistration = (e) => {
    e.preventDefault();
    setError(validate(nameValue));
    setIsSubmit(true);
  }
  const validate = (value) => {
    const error = {};
    if (!value) {
      error.name = "Введіть будь ласка імʼя"
    } else if (!value.trim()) {
      error.name = "Імʼя не може буди із пустих символів"
    }
    if(value.length > 30) {
      error.name = "Імʼя має бути менше 30 символів"
    }
    return error;
  }
  const handleChange = (e) => {
    setNameValue(e.target.value);
  }
  useEffect(() => {
    if(Object.keys(error).length === 0 && isSubmit) {
      return navigate(`/registered/${encodeURIComponent(nameValue)}`)
    }
  }, [error])

  return (
    <>
      <form onSubmit={ handleRegistration } >
        <p className ='error'>{error.name}</p>
        <div>
        <input placeholder='Імʼя' value={nameValue} onChange={handleChange}/>
        </div>
          <button className='button-submit' type='submit'>Зареєструватися</button>
      </form>
    </>
  )
}
export {RegisterUser}