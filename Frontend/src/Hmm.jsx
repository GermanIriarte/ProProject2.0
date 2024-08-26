import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom' 
import Persona from './Persona';
import CreatePersona from './CreatePersona';
import UpdatePersona from './UpdatePersona';

function Hmm(){
    return(
        <div className='Hmm'>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element= {<Persona />}></Route>
                    <Route path='/create' element= {<CreatePersona />}></Route>
                    <Route path='/update/:ID_Persona' element= {<UpdatePersona />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default Hmm;