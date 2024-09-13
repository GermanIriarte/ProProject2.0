import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login(){
  const [values, setValues] = useState({
    Usuario: '',
    Constraseña: ''
})
const navigate = useNavigate();
const [errors, setErrors] = useState({})
const handleInput = (event) => {
  setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
}
const handleSubmit =(event) => {
  event.preventDefault();
  axios.post('http://localhost:8081/login',values)
  .then(res => {
     if(res.data ==="Success"){
      navigate('/app'); 
     }else {
      alert("No record existed");
     }
  })
    .catch(err=>console.log(err));
  }

return (
  <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
    <div className='bg-white p-3 rounded w-25'>
      <h2>Sing-In</h2>
      <form action='' onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor='Usuario'><strong>Usuario</strong></label>
          <input type='Usuario' placeholder='Enter Usuario' name='Usuario' 
            onChange={handleInput} className='form-control rounded-0'/>
          {errors.email && <span className='text-danger'>{errors.email}</span>}
        </div>
        <div className='mb-3'>
          <label htmlFor='Contraseña'><strong>Password</strong></label>
          <input type='Constraseña' placeholder='Enter Contraseña' name='Contraseña' 
            onChange={handleInput} className='form-control rounded-0'/>
          {errors.password && <span className='text-danger'>{errors.password}</span>}
        </div>
        <button type='submit' className='btn btn-success w-100 rounded-0'>log in</button>
        <p>You are agreeing to our terms and policies</p>
      </form>
    </div>
  </div>
)
};


export default Login; 