import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
//Containers
import unauthenticatedContainer from '../containers/Unauthenticated';
import Login from '../../views/pages/usuario/Login';
import CriarConta from '../../views/pages/usuario/CriarConta';
import RecuperarSenha from '../../views/pages/usuario/RecuperarSenha';
import ValidarAcesso from '../../views/pages/usuario/ValidarAcesso';

const Rotas = () => {

    return (
        <BrowserRouter>
            <Routes>
                {/* Rotas não autenticadas */}
                <Route path='/sgu_web/' element={unauthenticatedContainer(Login)} />
                <Route path='/sgu_web/criar-conta' element={unauthenticatedContainer(CriarConta)} />
                <Route path='/sgu_web/recuperar-senha' element={unauthenticatedContainer(RecuperarSenha)} />
                <Route path='/sgu_web/validar-acesso' element={unauthenticatedContainer(ValidarAcesso)} />
            </Routes>
        </BrowserRouter>
    );
}

export default Rotas;