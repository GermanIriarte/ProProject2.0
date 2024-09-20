import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Empleados from './Empleados';

function UpdateEmpleados() {
    const [Nombres, setNombres] = useState('');
    const [Apellido1, setApellido1] = useState('');
    const [Apellido2, setApellido2] = useState('');
    const [FechaNac, setFechaNac] = useState('');
    const [Correo, setCorreo] = useState('');
    const [Telefono, setTelefono] = useState('');
    const [Puntos, setPuntos] = useState('');  // Agregar estado para Puntos
    const { ID_Persona } = useParams();
    const navigate = useNavigate();

    // Efecto para obtener los datos del empleado cuando cambie el ID_Persona
    useEffect(() => {
        console.log("id de la persona: ", ID_Persona);

        // Resetear el estado antes de cargar nuevos datos
        resetForm();
        
        axios.get(`http://localhost:8081/ReadClientesCedula?ID_Persona=${ID_Persona}`)
            .then(res => {
                const empleado = res.data[0];  // Suponiendo que la respuesta es un array con los datos del empleado
                if (empleado) {
                    setNombres(empleado.Nombres || '');
                    setApellido1(empleado.Apellido1 || '');
                    setApellido2(empleado.Apellido2 || '');
                    setCorreo(empleado.Correo || '');
                    setTelefono(empleado.Telefono || '');
                    setPuntos(empleado.Puntos || '');  // Asegúrate de obtener Puntos
                }
            })
            .catch(err => console.log(err));
    }, [ID_Persona]);

    // Función para resetear el formulario cuando se selecciona otro empleado
    const resetForm = () => {
        setNombres('');
        setApellido1('');
        setApellido2('');
        setCorreo('');
        setTelefono('');
        setPuntos('');  // Resetear Puntos
    };

    // Función para manejar el submit
    function handleSubmit(event) {
        event.preventDefault();
        axios.put(`http://localhost:8081/updateCliente/${ID_Persona}`, {
            Nombres,
            Apellido1,
            Apellido2,
            Correo,
            Telefono,
            Puntos,
        })
        .then(res => {
            console.log(res);
            navigate('/Cliente');  // Navegar de vuelta a la lista de empleados
        })
        .catch(err => console.log(err));
    }

    // Función para navegar atrás
    const handleNavigateBack = () => {
        navigate('/clientes');  // Navegar de vuelta a la lista de empleados
    };

    return (
        <div className='container'>
            <div className='form-container'>
                <form onSubmit={handleSubmit}>
                    <h2>Actualizar Empleado</h2>
                    <div className='mb-2'>
                        <label>Nombre</label>
                        <input 
                            type='text' 
                            value={Nombres}
                            placeholder='Ingrese Nombre' 
                            className='form-control'
                            onChange={e => setNombres(e.target.value)} 
                        />
                    </div>
                    <div className='mb-2'>
                        <label>Apellido1</label>
                        <input 
                            type='text' 
                            value={Apellido1}
                            placeholder='Ingrese Apellido1' 
                            className='form-control'
                            onChange={e => setApellido1(e.target.value)} 
                        />
                    </div>
                    <div className='mb-2'>
                        <label>Apellido2</label>
                        <input 
                            type='text' 
                            value={Apellido2}
                            placeholder='Ingrese Apellido2' 
                            className='form-control'
                            onChange={e => setApellido2(e.target.value)} 
                        />
                    </div>
                    <div className='mb-2'>
                        <label>Correo</label>
                        <input 
                            type='email' 
                            value={Correo}
                            placeholder='Ingrese Correo' 
                            className='form-control'
                            onChange={e => setCorreo(e.target.value)} 
                        />
                    </div>
                    <div className='mb-2'>
                        <label>Teléfono</label>
                        <input 
                            type='text' 
                            value={Telefono}
                            placeholder='Ingrese Teléfono' 
                            className='form-control'
                            onChange={e => setTelefono(e.target.value)}  
                        />
                    </div>
                    <div className='mb-2'>
                        <label>Puntos</label>
                        <input 
                            type='text' 
                            value={Puntos}
                            placeholder='Ingrese Puntos'  // Cambiar el placeholder
                            className='form-control'
                            onChange={e => setPuntos(e.target.value)}
                        />
                    </div>
                    <button type='submit' className='btn btn-success'>Actualizar</button>
                    <button type='button' className='btn btn-secondary ms-2' onClick={handleNavigateBack}>Atrás</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateEmpleados;
