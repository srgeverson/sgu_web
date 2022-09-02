import React, { Fragment } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '../context';
import AuthorizeRoutes from './AuthorizeRoutes';
//Containers
import unauthenticatedContainer from '../containers/Unauthenticated';
import authenticatedContainer from '../containers/Authenticated';
import Login from '../../views/pages/usuario/Login';
import CriarConta from '../../views/pages/usuario/CriarConta';
import RecuperarSenha from '../../views/pages/usuario/RecuperarSenha';
import ValidarAcesso from '../../views/pages/usuario/ValidarAcesso';
import PainelDeControle from '../../views/pages/PainelDeControle';
import PermissaoListar from '../../views/pages/permissao/Listar';
import PaginaInexistente from '../../views/pages/PaginaInexistente';

const Rotas = () => {
    return (
        <BrowserRouter>
            <Fragment>
                <AuthProvider>
                    <Routes>
                        {/* Rotas não autenticadas */}
                        <Route path='/sgu_web/' element={unauthenticatedContainer(Login)} />
                        <Route path='/sgu_web/criar-conta' element={unauthenticatedContainer(CriarConta)} />
                        <Route path='/sgu_web/recuperar-senha' element={unauthenticatedContainer(RecuperarSenha)} />
                        <Route path='/sgu_web/validar-acesso' element={unauthenticatedContainer(ValidarAcesso)} />
                        {/* Rotas autenticadas */}
                        <Route path='/sgu_web/painel-de-controle' element={<AuthorizeRoutes />}>
                            <Route path='/sgu_web/painel-de-controle' element={authenticatedContainer(PainelDeControle)} />
                        </Route>
                        <Route path='/sgu_web/permissoes' element={<AuthorizeRoutes />}>
                            <Route path='/sgu_web/permissoes' element={authenticatedContainer(PermissaoListar)} />
                        </Route>
                        <Route path="*" element={<PaginaInexistente />} />
                    </Routes>
                </AuthProvider>
            </Fragment>
        </BrowserRouter>
    );
}

export default Rotas;