import React, { useEffect, useState } from "react";
import axios from 'axios';
import './Persona.css';
import { Link, useNavigate } from "react-router-dom";

function Compra() {
    const [compras, setCompras] = useState([]);
    const [productos, setProductos] = useState([]); // Estado para almacenar los productos
    const [itemsVendidos, setItemsVendidos] = useState([]); // Estado para almacenar los items vendidos
    const navigate = useNavigate();  // Crear instancia de navigate

    useEffect(() => {
        // Obtener las compras
        axios.get('http://localhost:8081/readCompra')
            .then(res => setCompras(res.data))
            .catch(err => console.log(err));

        // Obtener los productos
        axios.get('http://localhost:8081/readProductos')
            .then(res => setProductos(res.data))
            .catch(err => console.log(err));

        // Obtener los items vendidos
        axios.get('http://localhost:8081/readItemsVendidos')
            .then(res => setItemsVendidos(res.data))
            .catch(err => console.log(err));
    }, []);

    // Función para eliminar una compra
    const handleDelete = async (Cod_Factura) => {
        try {
            await axios.delete('http://localhost:8081/deleteCompra/' + Cod_Factura);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };

    // Función para calcular el precio total de la compra
    const calcularPrecioTotal = (Cod_Factura) => {
        let total = 0;

        // Filtrar los items vendidos que corresponden a la factura actual
        const itemsDeFactura = itemsVendidos.filter(item => item.Cod_Factura === Cod_Factura);

        itemsDeFactura.forEach(item => {
            // Encontrar el producto correspondiente a Cod_Producto
            const producto = productos.find(prod => prod.Cod_Producto === item.Cod_Producto);

            // Calcular el precio total de este item y sumarlo al total
            if (producto) {
                total += item.Cantidad * producto.Precio;
            }
        });

        return total;
    };

    const handleNavigateBack = () => {
        navigate('/app');  // Navegar de vuelta a la lista de empleados
    };

    return (
        <div className='persona-container'>
            <div className='persona-content'>
                <Link to="/createCompras" className='persona-add-btn'>Generar Factura</Link>
                <table className='persona-table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Fecha</th>
                            <th>ID Persona</th>
                            <th>Precio Total</th> {/* Nueva columna para el precio total */}
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            compras.map((data, i) => (
                                <tr key={i}>
                                    <td>{data.Cod_Factura}</td>
                                    <td>{data.Fecha}</td>
                                    <td>{data.ID_Persona}</td>
                                    <td>${calcularPrecioTotal(data.Cod_Factura).toFixed(2)}</td> {/* Mostrar el precio total */}
                                    <Link to={`/createItems/${data.Cod_Factura}/${data.ID_Persona}`} className='btn btn-primary'>Items</Link>
                                    <td><button className="persona-delete-btn" onClick={() => handleDelete(data.Cod_Factura)}>Delete</button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <button type='button' className='btn btn-secondary ms-2' onClick={handleNavigateBack}>Atrás</button>
            </div>
        </div>
    );
}

export default Compra;
