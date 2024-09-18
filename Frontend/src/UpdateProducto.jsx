import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateProducto() {
    const [Nombre, Setname] = useState('');
    const [Cantidad, SetAmount] = useState('');
    const [Precio, SetPrice] = useState('');
    const [Categoria, SetCategory] = useState('');
    const { Cod_Producto } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // Al cambiar el Cod_Producto, restablecer los estados
        Setname('');
        SetAmount('');
        SetPrice('');
        SetCategory('');

        // Obtener los datos del producto al montar el componente o cambiar de producto
        console.log(Cod_Producto)
        axios.get(`http://localhost:8081/readProducto?Cod_Producto=${Cod_Producto}`)
            .then(res => {
                const producto = res.data[0];  // Asume que la respuesta es un array
                Setname(producto.Nombre || '');
                SetAmount(producto.Cantidad || '');
                SetPrice(producto.Precio || '');
                SetCategory(producto.Categoria || '');
            })
            .catch(err => {
                console.error(err);
                // Manejar el error, por ejemplo, redirigir o mostrar un mensaje de error
            });
    }, [Cod_Producto]);  // Ejecutar el efecto cada vez que cambie el Cod_Producto

    function handleSubmit(event) {
        event.preventDefault();
        axios.put(`http://localhost:8081/ProductoUpdate/${Cod_Producto}`, {
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
    const handleNavigateBack = () => {
        navigate('/app');  // Navegar de vuelta a la lista de empleados
    };

    return (
        <div className='container'>
            <div className='form-container'>
                <form onSubmit={handleSubmit}>
                    <h2>Update Producto</h2>
                    <div className='mb-2'>
                        <label htmlFor=''>Name</label>
                        <input 
                            type='text' 
                            value={Nombre}  // Set value to current state
                            placeholder='Enter Name' 
                            className='form-control'
                            onChange={e => Setname(e.target.value)} 
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor=''>Amount</label>
                        <input 
                            type='number' 
                            value={Cantidad}  // Set value to current state
                            placeholder='Enter Amount' 
                            className='form-control'
                            onChange={e => SetAmount(e.target.value)} 
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor=''>Price</label>
                        <input 
                            type='number' 
                            value={Precio}  // Set value to current state
                            placeholder='Enter Price' 
                            className='form-control'
                            onChange={e => SetPrice(e.target.value)} 
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor=''>Category</label>
                        <input 
                            type='text' 
                            value={Categoria}  // Set value to current state
                            placeholder='Enter Category' 
                            className='form-control'
                            onChange={e => SetCategory(e.target.value)}  
                        />
                    </div>
                    <button className='btn btn-success'>Update</button>
                    <button type='button' className='btn btn-secondary ms-2' onClick={handleNavigateBack}>Atrás</button>
                </form>
                
            </div>
        </div>
    );
}

export default UpdateProducto;
