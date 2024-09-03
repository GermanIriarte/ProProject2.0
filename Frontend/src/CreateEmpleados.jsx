import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreatePerson.css';

function CreateEmpleados() {
    const [Nombres, Setname] = useState('');
    const [Apellido1, SetLastName1] = useState('');
    const [Apellido2, SetLastName2] = useState('');
    const [FechaNac, SetDate] = useState('');
    const [Correo, SetEmail] = useState('');
    const [Telefono, SetPhone] = useState('');
    const [Usuario, SetUser] = useState('');
    const [Contraseña, SetPassword] = useState('');
    const [Tipo_Usuario, SetTypeUser] = useState('');
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        const formattedDate = new Date(FechaNac).toISOString().split('T')[0]; // Asegura el formato 'YYYY-MM-DD'
        axios.post('http://localhost:8081/createEmpleado', {
            Nombres,
            Apellido1,
            Apellido2,
            FechaNac: formattedDate,
            Correo,
            Telefono,
            Usuario,
            Contraseña,
            Tipo_Usuario
        })
        .then(res => {
            console.log(res);
            navigate('/Empleados');
        })
        .catch(err => console.log(err));
    }

    return (
        <div className='persona-container'>
            <div className='persona-content'>
                <form onSubmit={handleSubmit}>
                    <h2>Add Empleado</h2>
                    <div className='mb-2'>
                        <label htmlFor='name'>Name</label>
                        <input 
                            type='text' 
                            id='name'
                            placeholder='Enter Name' 
                            className='form-control'
                            onChange={e => Setname(e.target.value)} 
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='apellido1'>Apellido1</label>
                        <input 
                            type='text' 
                            id='apellido1'
                            placeholder='Enter Apellido1' 
                            className='form-control'
                            onChange={e => SetLastName1(e.target.value)} 
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='apellido2'>Apellido2</label>
                        <input 
                            type='text' 
                            id='apellido2'
                            placeholder='Enter Apellido2' 
                            className='form-control'
                            onChange={e => SetLastName2(e.target.value)} 
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='fechaNac'>Birth Day</label>
                        <input 
                            type='date' 
                            id='fechaNac'
                            placeholder='Enter Birth Date' 
                            className='form-control'
                            onChange={e => SetDate(e.target.value)} 
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='email'>Email</label>
                        <input 
                            type='email' 
                            id='email'
                            placeholder='Enter Email' 
                            className='form-control'
                            onChange={e => SetEmail(e.target.value)} 
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='telefono'>Telefono</label>
                        <input 
                            type='text' 
                            id='telefono'
                            placeholder='Enter Phone' 
                            className='form-control'
                            onChange={e => SetPhone(e.target.value)}  
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='usuario'>Nombre de usuario</label>
                        <input 
                            type='text' 
                            id='usuario'
                            placeholder='Enter User' 
                            className='form-control'
                            onChange={e => SetUser(e.target.value)}  
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='contraseña'>Contraseña</label>
                        <input 
                            type='password' 
                            id='contraseña'
                            placeholder='Enter Password' 
                            className='form-control'
                            onChange={e => SetPassword(e.target.value)}  
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='tipoUsuario'>Tipo Usuario</label>
                        <select 
                            id='tipoUsuario'
                            className='form-control'
                            onChange={(e) => SetTypeUser(e.target.value)} 
                        >
                            <option value="">Selecciona el tipo de usuario</option>
                            <option value="Admin">Admin</option>
                            <option value="Cajero">Cajero</option>
                        </select>
                    </div>
                    <div className='persona-btns'>
                        <button type='submit' className='persona-add-btn'>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateEmpleados;
