import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreatePersona() {
    const [ID_Persona,SetID] = useState('')
    const [Nombres,Setname] = useState('')
    const [Apellido1,SetLastName1] = useState('')
    const [Apellido2,SetLastName2] = useState('')
    const [FechaNac,SetDate] = useState('')
    const [Correo,SetEmail] = useState('')
    const [Telefono,SetPhone] = useState('')
    const navigate = useNavigate();
    
    function handleSubmit(event){
        console.log("AAAAAAA")
        event.preventDefault();
        axios.post('http://localhost:8081/create',{ID_Persona,Nombres,Apellido1,Apellido2,FechaNac,Correo,Telefono})
        .then(res => {
            console.log(res);
            navigate('/');
        }).catch(err => console.log(err));
    }
    return (
      <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
          <form onSubmit={handleSubmit}>
            <h2>Add Persona</h2>
            <div className='mb-2'>
              <label htmlFor=''>ID</label>
              <input type='text' placeholder='Enter ID' className='form-control'
              onChange={e => SetID(e.target.value)} />
            </div>
            <div className='mb-2'>
              <label htmlFor=''>Name</label>
              <input type='text' placeholder='Enter Name' className='form-control'
              onChange={e => Setname(e.target.value)} />
            </div>
            <div className='mb-2'>
              <label htmlFor=''>Apellido1</label>
              <input type='text' placeholder='Enter Name' className='form-control'
              onChange={e => SetLastName1(e.target.value)} />
            </div>
            <div className='mb-2'>
              <label htmlFor=''>Apellido2</label>
              <input type='text' placeholder='Enter Name' className='form-control'
              onChange={e => SetLastName2(e.target.value)} />
            </div>
            <div className='mb-2'>
              <label htmlFor=''>Birth Day</label>
              <input type='date' placeholder='Enter Name' className='form-control'
              onChange={e => SetDate(e.target.value)} />
            </div>
            <div className='mb-2'>
              <label htmlFor=''>Email</label>
              <input type='email' placeholder='Enter Email' className='form-control'
              onChange={e => SetEmail(e.target.value)} />
            </div>
            <div className='mb-2'>
              <label htmlFor=''>Telefono</label>
              <input type='text' placeholder='Enter Name' className='form-control'
              onChange={e => SetPhone} />
            </div>
            <button className='btn btn-success'>Submit</button>
          </form>
        </div>
      </div>
    );
  }

export default CreatePersona;
