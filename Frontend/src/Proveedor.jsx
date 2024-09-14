import React, {useEffect, useState} from "react";
import axios from 'axios'
import './Persona.css';
import { Link } from "react-router-dom";

function Proveedor() {
    const [Proveedor, setProveedor] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8081/readProveedor')
            .then(res => setProveedor(res.data))
            .catch(err => console.log(err));
    }, []);
    const handleDelete = async(Cod_Proveedor ) =>{
        try {
            await axios.delete('http://localhost:8081/deleteProveedor/' + Cod_Proveedor  )
            window.location.reload()
        }catch(err) {
            console.log(err);
        }
    }
    return (
        <div className='persona-container'>
            <div className='persona-content'>
                <Link to = "/createProveedor"className='persona-add-btn'>Add +</Link>
                <table className='persona-table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Proveedor.map((data,i) => (
                                <tr key={i}>
                                    <td>{data.Cod_Proveedor}</td>
                                    <td>{data.Nombre_Proveedor}</td>
                                    <td><Link to={`/updateProveedor/${data.Cod_Proveedor}`} className='btn btn-primary'>Update</Link></td>
                                    <td><button className="persona-delete-btn" onClick={() => handleDelete(data.Cod_Proveedor)}>Delete</button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Proveedor;