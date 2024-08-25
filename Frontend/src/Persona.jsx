import React, {useEffect, useState} from "react";
import axios from 'axios'
import './Persona.css';

function Persona() {
    const [Persona, setPersona] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8081/')
            .then(res => setPersona(res.data))
            .catch(err => console.log(err));
    }, []);

    return (
        <div className='persona-container'>
            <div className='persona-content'>
                <button className='persona-add-btn'>Add +</button>
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
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Persona.map((data,i) => (
                                <tr key={i}>
                                    <td>{data.ID_Persona}</td>
                                    <td>{data.Nombres}</td>
                                    <td>{data.Apellido1}</td>
                                    <td>{data.Apellido2}</td>
                                    <td>{data.FechaNac}</td>
                                    <td>{data.Correo}</td>
                                    <td>{data.Telefono}</td>
                                    <td><button className="persona-update-btn">Update</button></td>
                                    <td><button className="persona-delete-btn">Delete</button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Persona;