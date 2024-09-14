import React, {useEffect, useState} from "react";
import axios from 'axios'
import './Persona.css';
import { Link } from "react-router-dom";

function Empleados() {
    const [empleados, setEmpleado] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8081/readEmpleado')
            .then(res => {
                setEmpleado(res.data); // Guardar directamente la respuesta de la API
            })
            .catch(err => console.log(err));
    }, []);
    
    const handleDelete = async(ID_Persona) =>{
        try {
            await axios.delete('http://localhost:8081/deleteEmpleado/' + ID_Persona )
            window.location.reload()
        }catch(err) {
            console.log(err);
        }
    }
    return (
        <div className='persona-container'>
            <div className='persona-content'>
                <Link to = "/createEmpleados"className='persona-add-btn'>Add +</Link>
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
                            <th>Usuario</th>
                            <th>Tipo Empleado</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            empleados.map((data,i) => (
                                <tr key={i}>
                                    <td>{data.ID_Persona}</td>
                                    <td>{data.Nombres}</td>
                                    <td>{data.Apellido1}</td>
                                    <td>{data.Apellido2}</td>
                                    <td>{data.FechaNac}</td>
                                    <td>{data.Correo}</td>
                                    <td>{data.Telefono}</td>
                                    <td>{data.Usuario}</td>  {/* Agregar el campo Usuario */}
                                    <td>{data.Tipo_Usuario}</td>  {/* Agregar el campo Tipo_Usuario */}
                                    <td><Link to={`/updateEmpleados/${data.ID_Persona}`} className='btn btn-primary'>Update</Link></td>
                                    <td><button className="persona-delete-btn" onClick={() => handleDelete(data.ID_Persona)}>Delete</button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Empleados;