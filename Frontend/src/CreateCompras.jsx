import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreatePerson.css';

function CreateCompras() {
    const [Fecha, SetDate] = useState('');
    const [ID_Persona , SetIdPer] = useState('');
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        const formattedDate = new Date(Fecha).toISOString().split('T')[0]; // Asegura el formato 'YYYY-MM-DD'
        axios.post('http://localhost:8081/createCompra', {
            Fecha: formattedDate,
            ID_Persona
        })
        .then(res => {
            console.log(res);
            navigate('/app');
        })
        .catch(err => console.log(err));
    }

    return (
        <div className='persona-container'>
            <div className='persona-content'>
                <form onSubmit={handleSubmit}>
                    <h2>Add Compra</h2>
                    <div className='mb-2'>
                        <label htmlFor='fechaNac'>Birth Day</label>
                        <input 
                            type='date' 
                            id='fechaNac'
                            placeholder='Enter Birth Date' 
                            className='form-control'
                            onChange={e => SetDate(e.target.value)} 
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='ID_Persona'>Id Cliente</label>
                        <input 
                            type='number' 
                            id='ID_Persona'
                            placeholder='Enter Points' 
                            className='form-control'
                            onChange={e => SetIdPer(e.target.value)}  
                        />
                    </div>
                    <div className='persona-btns'>
                        <button type='submit' className='persona-add-btn'>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateCompras;

