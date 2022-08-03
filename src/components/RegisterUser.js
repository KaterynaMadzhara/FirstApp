import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterUser() {
  const initialValues = { username: '', usersurname: '' }
  const [formValues, setFormValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  const handleRegistration = (e) => {
    e.preventDefault();
    redirect(validate(formValues));
  }

  const redirect = (errors) => {
    setErrors(errors)
    if(Object.keys(errors).length === 0) {
      navigate(`/registered/${encodeURIComponent(formValues.username)}/${encodeURIComponent(formValues.usersurname)}`)
    }
  }
  const validate = (values) => {
    const errors = {};
    const wordMapping = {
      username: 'Імʼя',
      usersurname: 'Прізвище'
    }
    for (const property in values) {
      if (!values[property]) {
        errors[property] = `Введіть будь ласка ${ wordMapping[property] }`
      } else if (!values[property].trim()) {
        errors[property] = `${ wordMapping[property] } не може буди із пустих символів`
      } else if (values[property].length > 30) {
        errors[property] = `${ wordMapping[property] } має бути менше 30 символів`
      }
    }
    return errors;
  }
  const handleChange = (e) => {
    const { name , value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  }

  return (
      <form onSubmit={ handleRegistration } >
        <p className ='error'>{ errors.username }</p>
        <div>
          <input placeholder='Імʼя' name='username' value={ formValues.username } onChange={ handleChange }/>
        </div>
        <p className ='error'>{ errors.usersurname }</p>
        <div>
          <input placeholder='Прізвище' name='usersurname' value={ formValues.usersurname } onChange={ handleChange }/>
        </div>
        <button className='button-submit' type='submit'>Зареєструватися</button>
      </form>
  )
}
export { RegisterUser }