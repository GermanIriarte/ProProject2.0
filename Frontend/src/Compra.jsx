import React, { useEffect, useState } from "react";
import axios from 'axios';
import './Persona.css';
import { Link, useNavigate } from "react-router-dom";

function Compra() {
    const [compras, setCompras] = useState([]);
    const navigate = useNavigate();  // Crear instancia de navigate

    useEffect(() => {
        axios.get('http://localhost:8081/readCompra')
            .then(res => {
                setCompras(res.data); // Guardar directamente la respuesta de la API
            })
            .catch(err => console.log(err));
    }, []);

    const handleDelete = async (Cod_Factura) => {
        try {
            await axios.delete('http://localhost:8081/deleteCompra/' + Cod_Factura);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };

    const handleNavigateBack = () => {
        navigate('/app');  // Navegar de vuelta a la lista de empleados
    };

    return (
        <div className='persona-container'>
            <div className='persona-content'>
                <Link to="/createCompras" className='persona-add-btn'>Add +</Link>
                <table className='persona-table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Fecha</th>
                            <th>ID Persona </th>
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
                                    <td><Link to={`/createItems/${data.Cod_Factura}`} className='btn btn-primary'>Items</Link></td>
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
