import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function CreateItems() {
    // Extraer ambos parámetros de la URL
    const { Cod_Factura, ID_Persona } = useParams();  
    const [Cod_Producto, setCodProducto] = useState('');
    const [Cantidad, setCantidad] = useState('');
    const [itemsVendidos, setItemsVendidos] = useState([]); 
    const navigate = useNavigate();  

    useEffect(() => {
        // Obtener los items vendidos para la factura actual
        axios.get(`http://localhost:8081/itemsVendidos/${Cod_Factura}`)
        .then(res => {
            setItemsVendidos(res.data);  
        })
        .catch(err => console.log(err));
    }, [Cod_Factura]);

    function handleSubmit(event) {
        event.preventDefault();
        
        if (Cantidad <= 0) {
            alert("La cantidad debe ser mayor a 0");
            return;
        }

        // Realizar la solicitud POST enviando Cod_Producto y Cantidad en el cuerpo, y Cod_Factura e ID_Persona en la URL
        axios.post(`http://localhost:8081/createItemVendido/${Cod_Factura}/${ID_Persona}`, {
            Cod_Producto,
            Cantidad
        })
        .then(res => {
            alert(res.data.message);  

            // Actualizar la lista de items vendidos
            axios.get(`http://localhost:8081/itemsVendidos/${Cod_Factura}`)
            .then(res => {
                setItemsVendidos(res.data);
                // Limpiar los campos del formulario si lo deseas
                setCodProducto('');
                setCantidad('');
            });
        })
        .catch(err => {
            if (err.response && err.response.data.message) {
                alert(err.response.data.message);  // Mostrar el error del servidor (e.g., "Stock insuficiente")
            } else {
                console.log(err);
            }
        });
    }

    function handleNavigateBack() {
        navigate('/app');
    }

    return (
        <div className='container'>
            <div className='row'>
                {/* Sección izquierda: Items vendidos */}
                <div className='col-md-6'>
                    <h2>Items Vendidos de Factura {Cod_Factura}</h2>
                    {itemsVendidos.length === 0 ? (
                        <p>No hay items vendidos para esta factura.</p>
                    ) : (
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Código Producto</th>
                                    <th>Cantidad</th>
                                </tr>
                            </thead>
                            <tbody>
                                {itemsVendidos.map((item, i) => (
                                    <tr key={i}>
                                        <td>{item.Cod_Producto}</td>
                                        <td>{item.Cantidad}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* Sección derecha: Formulario para agregar nuevo item */}
                <div className='col-md-6'>
                    <div className='form-container'>
                        <form onSubmit={handleSubmit}>
                            <h2>Añadir Item a la Factura {Cod_Factura}</h2>
                            <div className='mb-2'>
                                <label htmlFor=''>Producto</label>
                                <input 
                                    type='text' 
                                    placeholder='Ingrese el código del producto' 
                                    className='form-control'
                                    value={Cod_Producto}
                                    onChange={e => setCodProducto(e.target.value)} 
                                />
                            </div>
                            <div className='mb-2'>
                                <label htmlFor=''>Cantidad</label>
                                <input 
                                    type='number' 
                                    placeholder='Ingrese la cantidad' 
                                    className='form-control'
                                    value={Cantidad}
                                    onChange={e => setCantidad(e.target.value)} 
                                />
                            </div>
                            <button type='submit' className='btn btn-success'>Agregar</button>
                        </form>

                        {/* Botón para navegar atrás */}
                        <button type='button' className='btn btn-secondary ms-2' onClick={handleNavigateBack}>
                            Atrás
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateItems;
