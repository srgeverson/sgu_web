import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
//Containers
import unauthenticatedContainer from '../containers/Unauthenticated';
import CriarConta from '../../views/pages/usuario/CriarConta';
import Login from '../../views/pages/usuario/Login';
import RecuperarSenha from '../../views/pages/usuario/RecuperarSenha';

const Rotas = () => {

    return (
        <BrowserRouter>
            <Routes>
                {/* Rotas não autenticadas */}
                <Route path='/sgu_web/' element={unauthenticatedContainer(Login)} />
                <Route path='/sgu_web/criar-conta' element={unauthenticatedContainer(CriarConta)} />
                <Route path='/sgu_web/recuperar-senha' element={unauthenticatedContainer(RecuperarSenha)} />
            </Routes>
        </BrowserRouter>
    );
}

export default Rotas;