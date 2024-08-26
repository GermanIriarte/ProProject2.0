import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreatePerson.css';

function CreatePersona() {
    const [Nombres, Setname] = useState('');
    const [Apellido1, SetLastName1] = useState('');
    const [Apellido2, SetLastName2] = useState('');
    const [FechaNac, SetDate] = useState('');
    const [Correo, SetEmail] = useState('');
    const [Telefono, SetPhone] = useState('');  
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        const formattedDate = new Date(FechaNac).toISOString().split('T')[0];  // Esto asegura el formato 'YYYY-MM-DD'
        axios.post('http://localhost:8081/create', {
            Nombres, 
            Apellido1, 
            Apellido2, 
            FechaNac: formattedDate,
            Correo, 
            Telefono
        })
        .then(res => {
            console.log(res);
            navigate('/');
        })
        .catch(err => console.log(err));
    }

    return (
        <div className='container'>
            <div className='form-container'>
                <form onSubmit={handleSubmit}>
                    <h2>Add Persona</h2>
                    <div className='mb-2'>
                        <label htmlFor=''>Name</label>
                        <input 
                            type='text' 
                            placeholder='Enter Name' 
                            className='form-control'
                            onChange={e => Setname(e.target.value)} 
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor=''>Apellido1</label>
                        <input 
                            type='text' 
                            placeholder='Enter Apellido1' 
                            className='form-control'
                            onChange={e => SetLastName1(e.target.value)} 
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor=''>Apellido2</label>
                        <input 
                            type='text' 
                            placeholder='Enter Apellido2' 
                            className='form-control'
                            onChange={e => SetLastName2(e.target.value)} 
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor=''>Birth Day</label>
                        <input 
                            type='date' 
                            placeholder='Enter Birth Date' 
                            className='form-control'
                            onChange={e => SetDate(e.target.value)} 
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor=''>Email</label>
                        <input 
                            type='email' 
                            placeholder='Enter Email' 
                            className='form-control'
                            onChange={e => SetEmail(e.target.value)} 
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor=''>Telefono</label>
                        <input 
                            type='text' 
                            placeholder='Enter Phone' 
                            className='form-control'
                            onChange={e => SetPhone(e.target.value)}  
                        />
                    </div>
                    <button className='btn btn-success'>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default CreatePersona;
