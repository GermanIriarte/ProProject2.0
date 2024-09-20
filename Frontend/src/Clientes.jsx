import React, { useEffect, useState } from "react";
import axios from 'axios';
import './Persona.css';
import { Link, useNavigate } from "react-router-dom";

function Clientes() {
    const [clientes, setCliente] = useState([]);
    const navigate = useNavigate();  // Crear instancia de navigate

    useEffect(() => {
        axios.get('http://localhost:8081/readCliente')
            .then(res => {
                setCliente(res.data); // Guardar directamente la respuesta de la API
            })
            .catch(err => console.log(err));
    }, []);

    const handleDelete = async (ID_Persona) => {
        try {
            await axios.delete('http://localhost:8081/deleteCliente/' + ID_Persona);
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
                <Link to="/createClientes" className='persona-add-btn'>Add +</Link>
                <table className='persona-table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Apellido 1</th>
                            <th>Apellido 2</th>
                            <th>Fecha Nacimiento</th>
                            <th>Correo</th>
                            <th>Telefono</th>
                            <th>Puntos</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            clientes.map((data, i) => (
                                <tr key={i}>
                                    <td>{data.ID_Persona}</td>
                                    <td>{data.Nombres}</td>
                                    <td>{data.Apellido1}</td>
                                    <td>{data.Apellido2}</td>
                                    <td>{data.FechaNac}</td>
                                    <td>{data.Correo}</td>
                                    <td>{data.Telefono}</td>
                                    <td>{data.Puntos !== null ? data.Puntos : 'No Disponible'}</td>
                                    <td><Link to={`/updateClientes/${data.ID_Persona}`} className='btn btn-primary'>Update</Link></td>
                                    <td><button className="persona-delete-btn" onClick={() => handleDelete(data.ID_Persona)}>Delete</button></td>
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

export default Clientes;
