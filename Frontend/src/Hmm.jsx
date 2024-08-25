import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom' 
import Persona from './Persona';

function Hmm(){
    return(
        <div className='Hmm'>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element= {<Persona />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default Hmm;