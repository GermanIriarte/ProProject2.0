import React, {useEffect, useState} from "react";
import axios from 'axios'
import './Persona.css';
import { Link } from "react-router-dom";

const RegistrarCompra = () => {
    const [cedula, setCedula] = useState('');
    const [codigoProducto, setCodigoProducto] = useState('');
    const [cantidad, setCantidad] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:8081/RegistrarCompra', {
                cedula: cedula,
                codigoProducto: codigoProducto,
                cantidad: cantidad
            });
            console.log(response.data);
            alert('Compra registrada exitosamente');
        } catch (error) {
            console.error('Error registrando la compra:', error);
            alert('Error registrando la compra');
        }
    };

    return (
        <div>
            <h2>Registrar Compra</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Cédula del Usuario:</label>
                    <input 
                        type="text" 
                        value={cedula} 
                        onChange={(e) => setCedula(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Código del Producto:</label>
                    <input 
                        type="text" 
                        value={codigoProducto} 
                        onChange={(e) => setCodigoProducto(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Cantidad Comprada:</label>
                    <input 
                        type="number" 
                        value={cantidad} 
                        onChange={(e) => setCantidad(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit">Registrar Compra</button>
            </form>
        </div>
    );
};

export default RegistrarCompra;
