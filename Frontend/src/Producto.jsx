import React, {useEffect, useState} from "react";
import axios from 'axios'
import './Persona.css';
import { Link } from "react-router-dom";

function Producto() {
    const [Producto, setProducto] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8081/readProductos')
            .then(res => setProducto(res.data))
            .catch(err => console.log(err));
    }, []);
    const handleDelete = async(Cod_Producto) =>{
        try {
            await axios.delete('http://localhost:8081/deleteProducto/' + Cod_Producto )
            window.location.reload()
        }catch(err) {
            console.log(err);
        }
    }
    return (
        <div className='persona-container'>
            <div className='persona-content'>
                <Link to = "/createProducto"className='persona-add-btn'>Add +</Link>
                <table className='persona-table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Cantidad</th>
                            <th>Precio</th>
                            <th>Categoria</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Producto.map((data,i) => (
                                <tr key={i}>
                                    <td>{data.Cod_Producto}</td>
                                    <td>{data.Nombre}</td>
                                    <td>{data.Cantidad}</td>
                                    <td>{data.Precio}</td>
                                    <td>{data.Categoria}</td>
                                    <td><Link to={`updateProducto/${data.Cod_Producto}`} className='btn btn-primary'>Update</Link></td>
                                    <td><button className="persona-delete-btn" onClick={() => handleDelete(data.Cod_Producto)}>Delete</button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Producto;