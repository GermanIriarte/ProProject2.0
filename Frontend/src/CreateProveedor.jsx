import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreatePerson.css';

function CreateProveedor() {
    const [Nombre_Proveedor, Setname] = useState('');
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:8081/createProveedor', {
            Nombre_Proveedor, 
        })
        .then(res => {
            console.log(res);
            navigate('/homeProveedor');
        })
        .catch(err => console.log(err));
    }

    return (
        <div className='container'>
            <div className='form-container'>
                <form onSubmit={handleSubmit}>
                    <h2>Add Proveedor</h2>
                    <div className='mb-2'>
                        <label htmlFor=''>Name</label>
                        <input 
                            type='text' 
                            placeholder='Enter Name' 
                            className='form-control'
                            onChange={e => Setname(e.target.value)} 
                        />
                    </div>
                    <button className='btn btn-success'>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default CreateProveedor;
