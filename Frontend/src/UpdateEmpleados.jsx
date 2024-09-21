import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateEmpleados() {
    const [Nombres, setNombres] = useState('');
    const [Apellido1, setApellido1] = useState('');
    const [Apellido2, setApellido2] = useState('');
    const [FechaNac, setFechaNac] = useState('');
    const [Correo, setCorreo] = useState('');
    const [Telefono, setTelefono] = useState('');
    const [Usuario, setUsuario] = useState('');
    const [Contraseña, setContraseña] = useState('');
    const [Tipo_Usuario, setTipoUsuario] = useState('');
    const { ID_Persona } = useParams();  // Extrae el parámetro de la cédula desde la URL
    const navigate = useNavigate();

    // Efecto para obtener los datos del empleado cuando cambie el ID_Persona
    useEffect(() => {
        console.log("id de la persona: ", ID_Persona);

        // Resetear el estado antes de cargar nuevos datos
        resetForm();
        
        axios.get(`http://localhost:8081/readPersonaCedula?ID_Persona=${ID_Persona}`)
            .then(res => {
                const empleado = res.data[0];  // Suponiendo que la respuesta es un array con los datos del empleado
                if (empleado) {
                    setNombres(empleado.Nombres || '');
                    setApellido1(empleado.Apellido1 || '');
                    setApellido2(empleado.Apellido2 || '');
                    setFechaNac(empleado.FechaNac || '');
                    setCorreo(empleado.Correo || '');
                    setTelefono(empleado.Telefono || '');
                    setUsuario(empleado.Usuario || '');
                    setContraseña(empleado.Contraseña || '');
                    setTipoUsuario(empleado.Tipo_Usuario || '');
                }
            })
            .catch(err => console.log(err));
    }, [ID_Persona]);  // Este efecto se ejecuta cuando cambia ID_Persona

    // Función para resetear el formulario cuando se selecciona otro empleado
    const resetForm = () => {
        setNombres('');
        setApellido1('');
        setApellido2('');
        setFechaNac('');
        setCorreo('');
        setTelefono('');
        setUsuario('');
        setContraseña('');
        setTipoUsuario('');
    };

    // Función para manejar el submit
    function handleSubmit(event) {
        event.preventDefault();
        axios.put(`http://localhost:8081/updateEmpleado/${ID_Persona}`, {
            Nombres,
            Apellido1,
            Apellido2,
            FechaNac,
            Correo,
            Telefono,
            Usuario,
            Contraseña,
            Tipo_Usuario
        })
        .then(res => {
            console.log(res);
            navigate('/app');  // Navegar de vuelta a la lista de empleados
        })
        .catch(err => console.log(err));
    }

    // Función para navegar atrás
    const handleNavigateBack = () => {
        navigate('/app');  // Navegar de vuelta a la lista de empleados
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
                        <label>Fecha de Nacimiento</label>
                        <input 
                            type='date' 
                            value={FechaNac}
                            className='form-control'
                            onChange={e => setFechaNac(e.target.value)} 
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
                        <label>Nombre de Usuario</label>
                        <input 
                            type='text' 
                            value={Usuario}
                            placeholder='Ingrese Nombre de Usuario' 
                            className='form-control'
                            onChange={e => setUsuario(e.target.value)}  
                        />
                    </div>
                    <div className='mb-2'>
                        <label>Contraseña</label>
                        <input 
                            type='password' 
                            value={Contraseña}
                            placeholder='Ingrese Contraseña' 
                            className='form-control'
                            onChange={e => setContraseña(e.target.value)}  
                        />
                    </div>
                    <div className='mb-2'>
                        <label>Tipo de Usuario</label>
                        <select 
                            className='form-control'
                            value={Tipo_Usuario}
                            onChange={e => setTipoUsuario(e.target.value)}  
                        >
                            <option value="">Selecciona el tipo de usuario</option>
                            <option value="Admin">Admin</option>
                            <option value="Cajero">Cajero</option>
                        </select>
                    </div>
                    <button type='submit' className='btn btn-success'>Actualizar</button>
                    <button type='button' className='btn btn-secondary ms-2' onClick={handleNavigateBack}>Atrás</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateEmpleados;
