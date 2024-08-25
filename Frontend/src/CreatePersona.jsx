import React, { useState } from 'react';
import './CreatePersona.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreatePersona() {
    const [ID,SetID] = useState('')
    const [name,Setname] = useState('')
    const [lastName1,SetLastName1] = useState('')
    const [lastName2,SetLastName2] = useState('')
    const [date,SetDate] = useState('')
    const [Email,SetEmail] = useState('')
    const [Phone,SetPhone] = useState('')
    const navigate = useNavigate();
    function handleSubmit(event){
        event.preventDefault();
        axios.post('http://localhost:8081/create',{ID,name,lastName1,lastName2,date,Email,Phone})
        .then(res => {
            console.log(res);
            navigate('/');
        }).catch(err => console.log(err));
    }
  return (
    <div className='persona-container'>
      <div className='persona-content'>
        <form onSubmit={handleSubmit}>
          <h2>Add Student</h2>
          <div className='form-group'>
            <label htmlFor=''>ID</label>
            <input type='text' placeholder='Enter ID' className='form-control'
            onChange={e => SetID(e.target.value)}/>

          </div>
          <div className='form-group'>
            <label htmlFor=''>Nombre</label>
            <input type='text' placeholder='Enter Name' className='form-control'
            onChange={e => Setname(e.target.value)} />
          </div>
          <div className='form-group'>
            <label htmlFor=''>Apellido</label>
            <input type='text' placeholder='Enter Apellido 1' className='form-control'
            onChange={e => SetLastName1(e.target.value)} />
          </div>
          <div className='form-group'>
            <label htmlFor=''>Apellido 2</label>
            <input type='text' placeholder='Enter Apellido 2' className='form-control'
            onChange={e => SetLastName2(e.target.value)} />
          </div>
          <div className='form-group'>
            <label htmlFor=''>Fecha Nacimiento</label>
            <input type='date' placeholder='Enter birth day' className='form-control'
            onChange={e => SetDate(e.target.value)} />
          </div>
          <div className='form-group'>
            <label htmlFor=''>Correo</label>
            <input type='email' placeholder='Enter Email' className='form-control' 
            onChange={e => SetEmail(e.target.value)}/>
          </div>
          <div className='form-group'>
            <label htmlFor=''>Telefono</label>
            <input type='text' placeholder='Enter phone number' className='form-control'
            onChange={e => SetPhone(e.target.value)} />
          </div>
          <button className='submit-btn'>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default CreatePersona;
