import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateProveedor() {
    const [Nombre_Proveedor, Setname] = useState('');
    const {Cod_Proveedor } = useParams();
    const navigate = useNavigate();
    
    function handleSubmit(event) {
        event.preventDefault();
        axios.put('http://localhost:8081/updateProveedor/' + Cod_Proveedor, {
            Nombre_Proveedor
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
                    <h2>Update Proveedor</h2>
                    <div className='mb-2'>
                        <label htmlFor=''>Name</label>
                        <input 
                            type='text' 
                            placeholder='Enter Name' 
                            className='form-control'
                            onChange={e => Setname(e.target.value)} 
                        />
                    </div>
                    <button className='btn btn-success'>Update</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateProveedor;
