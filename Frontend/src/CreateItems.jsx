import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';  // Importa useNavigate

function CreateItems() {
    const { Cod_Factura } = useParams();  // Extraer Cod_Factura de la URL
    const [Cod_Producto, setCodProducto] = useState('');
    const [Cantidad, setCantidad] = useState('');
    const navigate = useNavigate();  // Hook para navegar después de la creación

    function handleSubmit(event) {
        event.preventDefault();
        axios.post(`http://localhost:8081/createItemVendido/${Cod_Factura}`, {
            Cod_Producto,
            Cantidad
        })
        .then(res => {
            console.log(res);
            navigate('/app');  // Redirigir a /app después del envío exitoso
        })
        .catch(err => console.log(err));
    }

    return (
        <div className='container'>
            <div className='form-container'>
                <form onSubmit={handleSubmit}>
                    <h2>Add Item to Factura {Cod_Factura}</h2>
                    <div className='mb-2'>
                        <label htmlFor=''>Producto</label>
                        <input 
                            type='text' 
                            placeholder='Enter Product Code' 
                            className='form-control'
                            onChange={e => setCodProducto(e.target.value)} 
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor=''>Cantidad</label>
                        <input 
                            type='number' 
                            placeholder='Enter Quantity' 
                            className='form-control'
                            onChange={e => setCantidad(e.target.value)} 
                        />
                    </div>
                    <button className='btn btn-success'>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default CreateItems;
