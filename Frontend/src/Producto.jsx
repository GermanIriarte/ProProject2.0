import React, { useEffect, useState, useCallback } from "react";
import axios from 'axios';
import './Persona.css';
import { Link } from "react-router-dom";

function Producto() {
    const [productos, setProductos] = useState([]);
    const [categoria, setCategoria] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleCategoryChange = (event) => {
        setCategoria(event.target.value);
    };

    const fetchProductos = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const url = `http://localhost:8081/Categoria${categoria === 'All' ? '' : '/' + categoria}`;
            const response = await axios.get(url);
            setProductos(response.data);
        } catch (err) {
            setError('Error al obtener los productos. Intente de nuevo más tarde.');
        } finally {
            setLoading(false);
        }
    }, [categoria]);

    useEffect(() => {
        fetchProductos();
    }, [fetchProductos]);

    const handleDelete = async (productId) => {
        try {
            await axios.delete(`http://localhost:8081/deleteProducto/${productId}`);
            fetchProductos();
        } catch (error) {
            console.error("Error eliminando el producto", error);
        }
    };

    return (
        <div className='container mt-4'>
            <div className='d-flex justify-content-between align-items-center mb-4'>
                <select className='form-select' onChange={handleCategoryChange} value={categoria}>
                    <option value="">All</option>
                    <option value="Fruits">Fruits</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Books">Books</option>
                    <option value="Aseo">Aseo</option>
                </select>
                <Link to="/createProducto" className='btn btn-primary'>Add +</Link>
            </div>

            {loading ? (
                <p>Cargando productos...</p>
            ) : error ? (
                <p className='text-danger'>{error}</p>
            ) : (
                <table className='table table-striped table-bordered'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Cantidad</th>
                            <th>Precio</th>
                            <th>Categoria</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map((data) => (
                            <tr key={data.Cod_Producto}>
                                <td>{data.Cod_Producto}</td>
                                <td>{data.Nombre}</td>
                                <td>{data.Cantidad}</td>
                                <td>{data.Precio}</td>
                                <td>{data.Categoria}</td>
                                <td>
                                    <Link to={`updateProducto/${data.Cod_Producto}`} className='btn btn-info me-2'>Update</Link>
                                    <button className='btn btn-danger' onClick={() => handleDelete(data.Cod_Producto)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Producto;

