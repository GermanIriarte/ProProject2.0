import React, { useEffect, useState } from "react";
import axios from 'axios';
import './Persona.css';
import { Link, useNavigate } from "react-router-dom";

function Empleados() {
    const [empleados, setEmpleado] = useState([]);
    const [filterValue, setFilterValue] = useState('');
    const navigate = useNavigate();  // Definir el hook useNavigate

    useEffect(() => {
        fetchEmpleados();
    }, []);

    const fetchEmpleados = async (ID_Persona = '') => {
        try {
            const url = ID_Persona ? `http://localhost:8081/readEmpleadoCedula?ID_Persona=${ID_Persona}` : 'http://localhost:8081/readEmpleado';
            const response = await axios.get(url);
            setEmpleado(response.data);
        } catch (err) {
            console.error("Error al obtener empleados", err);
        }
    };

    const handleFilterChange = (event) => {
        setFilterValue(event.target.value);
    };

    const handleFilterSubmit = () => {
        fetchEmpleados(filterValue);
    };

    const handleDelete = async (ID_Persona) => {
        try {
            await axios.delete('http://localhost:8081/deleteEmpleado/' + ID_Persona);
            fetchEmpleados(); // Muestra todos los empleados después de eliminar
        } catch (err) {
            console.log(err);
        }
    };

    const handleNavigateBack = () => {
        navigate('/login');  // Navegar de vuelta a la ruta "/app"
    };

    return (
        <div className='persona-container'>
            <div className='persona-content'>
                <div className='search-container'>
                    <input
                        type='text'
                        placeholder='Ingrese cédula'
                        value={filterValue}
                        onChange={handleFilterChange}
                    />
                    <button onClick={handleFilterSubmit} className='btn btn-primary'>Filtrar</button>
                </div>
                <Link to="/createEmpleados" className='persona-add-btn'>Add +</Link>
                <table className='persona-table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Apellido 1</th>
                            <th>Fecha Nacimiento</th>
                            <th>Correo</th>
                            <th>Telefono</th>
                            <th>Tipo Empleado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {empleados.map((data, i) => (
                            <tr key={i}>
                                <td>{data.ID_Persona}</td>
                                <td>{data.Nombres}</td>
                                <td>{data.Apellido1}</td>
                                <td>{data.FechaNac}</td>
                                <td>{data.Correo}</td>
                                <td>{data.Telefono}</td>
                                <td>{data.Tipo_Usuario}</td>
                                <td>
                                    <Link to={`/updateEmpleados/${data.ID_Persona}`} className='btn persona-update-btn'>Update</Link>
                                    <button className='btn persona-delete-btn' onClick={() => handleDelete(data.ID_Persona)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button type='button' className='btn btn-secondary ms-2' onClick={handleNavigateBack}>Atrás</button>
            </div>
        </div>
    );
}

export default Empleados;
