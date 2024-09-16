import React, { useEffect, useState, useCallback } from "react";
import axios from 'axios';
import './Producto.css';  // Asegúrate de que el archivo CSS tenga los estilos que definiremos
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
                    <option value="">Todas</option>
                    <option value="Fruits">Frutas</option>
                    <option value="Clothing">Ropa</option>
                    <option value="Books">Libros</option>
                    <option value="Aseo">Aseo</option>
                </select>
                <Link to="/createProducto" className='btn btn-primary'>Agregar +</Link>
            </div>

            {loading ? (
                <p className='text-center'>Cargando productos...</p>
            ) : error ? (
                <p className='text-center text-danger'>{error}</p>
            ) : (
                <div className="table-responsive">
                    <table className='table table-hover table-bordered'>
                        <thead className='thead-dark'>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Cantidad</th>
                                <th>Precio</th>
                                <th>Categoría</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productos.map((data) => (
                                <tr key={data.Cod_Producto}>
                                    <td>{data.Cod_Producto}</td>
                                    <td>{data.Nombre}</td>
                                    <td>{data.Cantidad}</td>
                                    <td>${data.Precio.toFixed(2)}</td>
                                    <td>{data.Categoria}</td>
                                    <td>
                                        <Link to={`updateProducto/${data.Cod_Producto}`} className='btn btn-info btn-sm me-2'>Actualizar</Link>
                                        <button className='btn btn-danger btn-sm' onClick={() => handleDelete(data.Cod_Producto)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default Producto;
