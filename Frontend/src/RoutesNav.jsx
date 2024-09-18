import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom' 
import Persona from './Persona';
import CreatePersona from './CreatePersona';
import UpdatePersona from './UpdatePersona';
import App from './App'
import Producto from './Producto';
import CreateProducto from './CreateProducto';
import UpdateProducto from './UpdateProducto';
import Proveedor from './Proveedor';
import CreateProveedor from './CreateProveedor';
import UpdateProveedor from './UpdateProveedor';
import Clientes from './Clientes';
import CreateClientes from './CreateClientes';
import UpdateClientes from './UpdateClientes';
import Empleados from './Empleados';
import CreateEmpleados from './CreateEmpleados';
import UpdateEmpleados from './UpdateEmpleados';
import Login from './login';




function RoutesNav(){
    return(
        <div className='RoutesNav'>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element= {<Login />}></Route>
                    <Route path='/login' element= {<Login />}></Route>
                    <Route path='/app' element= {<App />}></Route>
                    <Route path='/home' element= {<Persona />}></Route>
                    <Route path='/create' element= {<CreatePersona />}></Route>
                    <Route path='home/update/:ID_Persona' element={<UpdatePersona />} />
                    <Route path='/homeProducto' element= {<Producto />}></Route>
                    <Route path='/createProducto' element= {<CreateProducto />}></Route>
                    <Route path='/updateProducto/:Cod_Producto' element={<UpdateProducto />} />
                    <Route path='/homeProveedor' element= {<Proveedor />}></Route>
                    <Route path='/createProveedor' element= {<CreateProveedor />}></Route>
                    <Route path='/updateProveedor/:Cod_Proveedor' element={<UpdateProveedor />} />
                    <Route path='/Clientes' element= {<Clientes />}></Route>
                    <Route path='/createClientes' element= {<CreateClientes />}></Route>
                    <Route path='/updateClientes/:ID_Persona' element={<UpdateClientes />} />
                    <Route path='/Empleados' element= {<Empleados />}></Route>
                    <Route path='/createEmpleados' element= {<CreateEmpleados />}></Route>
                    <Route path='/updateEmpleados/:ID_Persona' element={<UpdateEmpleados />} />

                    
                    
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default RoutesNav;