import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreatePerson.css';

function CreateProducto() {
    const [Nombre, Setname] = useState('');
    const [Cantidad, SetAmount] = useState('');
    const [Precio, SetPrice] = useState('');
    const [Categoria, SetCategory] = useState(''); 
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:8081/createProducto', {
            Nombre, 
            Cantidad, 
            Precio, 
            Categoria
        })
        .then(res => {
            console.log(res);
            navigate('/homeProducto');
        })
        .catch(err => console.log(err));
    }

    return (
        <div className='container'>
            <div className='form-container'>
                <form onSubmit={handleSubmit}>
                    <h2>Add Producto</h2>
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
                        <label htmlFor=''>Amount</label>
                        <input 
                            type='number' 
                            placeholder='Enter Amount' 
                            className='form-control'
                            onChange={e => SetAmount(e.target.value)} 
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor=''>Price</label>
                        <input 
                            type='number' 
                            placeholder='Enter Price' 
                            className='form-control'
                            onChange={e => SetPrice(e.target.value)} 
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor=''>Category</label>
                        <input 
                            type='text' 
                            placeholder='Enter Category' 
                            className='form-control'
                            onChange={e => SetCategory(e.target.value)}  
                        />
                    </div>
                    <button className='btn btn-success'>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default CreateProducto;
