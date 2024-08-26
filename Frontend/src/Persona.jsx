import React, {useEffect, useState} from "react";
import axios from 'axios'
import './Persona.css';
import { Link } from "react-router-dom";

function Persona() {
    const [Persona, setPersona] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8081/')
            .then(res => setPersona(res.data))
            .catch(err => console.log(err));
    }, []);
    const handleDelete = async(ID_Persona) =>{
        try {
            await axios.delete('http://localhost:8081/Persona/' + ID_Persona )
            window.location.reload()
        }catch(err) {
            console.log(err);
        }
    }
    return (
        <div className='persona-container'>
            <div className='persona-content'>
                <Link to = "/create"className='persona-add-btn'>Add +</Link>
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
                                    <td><Link to={`update/${data.ID_Persona}`} className='btn btn-primary'>Update</Link></td>
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

export default Persona;