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






function RoutesNav(){
    return(
        <div className='RoutesNav'>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element= {<App />}></Route>
                    <Route path='/home' element= {<Persona />}></Route>
                    <Route path='/create' element= {<CreatePersona />}></Route>
                    <Route path='home/update/:ID_Persona' element= {<UpdatePersona />}></Route>
                    <Route path='/homeProducto' element= {<Producto />}></Route>
                    <Route path='/createProducto' element= {<CreateProducto />}></Route>
                    <Route path='homeProducto/updateProducto/:Cod_Producto' element= {<UpdateProducto />}></Route>
                    <Route path='/homeProveedor' element= {<Proveedor />}></Route>
                    <Route path='/createProveedor' element= {<CreateProveedor />}></Route>
                    <Route path='homeProveedor/updateProveedor/:Cod_Proveedor' element= {<UpdateProveedor />}></Route>
                    <Route path='/Clientes' element= {<Clientes />}></Route>
                    <Route path='/createClientes' element= {<CreateClientes />}></Route>
                    <Route path='Clientes/updateClientes/:ID_Persona' element= {<UpdateClientes />}></Route>
                    
                    
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default RoutesNav;