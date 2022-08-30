import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
//Containers
import unauthenticatedContainer from '../containers/Unauthenticated';
import authenticatedContainer from '../containers/Authenticated';
import Login from '../../views/pages/usuario/Login';
import CriarConta from '../../views/pages/usuario/CriarConta';
import RecuperarSenha from '../../views/pages/usuario/RecuperarSenha';
import ValidarAcesso from '../../views/pages/usuario/ValidarAcesso';
import PainelDeControle from '../../views/pages/PainelDeControle';
import { AuthProvider } from '../context';

const Rotas = () => {

    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/* Rotas não autenticadas */}
                    <Route path='/sgu_web/' element={unauthenticatedContainer(Login)} />
                    <Route path='/sgu_web/criar-conta' element={unauthenticatedContainer(CriarConta)} />
                    <Route path='/sgu_web/recuperar-senha' element={unauthenticatedContainer(RecuperarSenha)} />
                    <Route path='/sgu_web/validar-acesso' element={unauthenticatedContainer(ValidarAcesso)} />
                    {/* Rotas autenticadas */}
                    <Route path='/sgu_web/painel-de-controle' element={authenticatedContainer(PainelDeControle)} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default Rotas;