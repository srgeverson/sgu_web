import React, { Fragment } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '../context';
import AuthorizeRoutes from './AuthorizeRoutes';
import { publicURL } from '../config';
//Containers
import unauthenticatedContainer from '../containers/Unauthenticated';
import authenticatedContainer from '../containers/Authenticated';
import Login from '../../views/pages/usuario/Login';
import CriarConta from '../../views/pages/usuario/CriarConta';
import RecuperarSenha from '../../views/pages/usuario/RecuperarSenha';
import ValidarAcesso from '../../views/pages/usuario/ValidarAcesso';
import PainelDeControle from '../../views/pages/PainelDeControle';
import PermissaoListar from '../../views/pages/permissao/Listar';
import UsuarioAlterar from '../../views/pages/usuario/Alterar';
import UsuarioListar from '../../views/pages/usuario/Listar';
import UsuarioVisualizar from '../../views/pages/usuario/Visualizar';
import PaginaInexistente from '../../views/pages/PaginaInexistente';

const Rotas = () => {
    return (
        <BrowserRouter>
            <Fragment>
                <AuthProvider>
                    <Routes>
                        {/* Rotas não autenticadas */}
                        <Route path={`${publicURL}/`} element={unauthenticatedContainer(Login)} />
                        <Route path={`${publicURL}/criar-conta`} element={unauthenticatedContainer(CriarConta)} />
                        <Route path={`${publicURL}/recuperar-senha`} element={unauthenticatedContainer(RecuperarSenha)} />
                        <Route path={`${publicURL}/validar-acesso`} element={unauthenticatedContainer(ValidarAcesso)} />
                        {/* Rotas autenticadas */}
                        <Route path={`${publicURL}/painel-de-controle`} element={<AuthorizeRoutes />}>
                            <Route path={`${publicURL}/painel-de-controle`} element={authenticatedContainer(PainelDeControle)} />
                        </Route>
                        <Route path={`${publicURL}/permissoes`} element={<AuthorizeRoutes />}>
                            <Route path={`${publicURL}/permissoes`} element={authenticatedContainer(PermissaoListar)} />
                        </Route>
                        <Route path={`${publicURL}/usuarios`} element={<AuthorizeRoutes />}>
                            <Route path={`${publicURL}/usuarios`} element={authenticatedContainer(UsuarioListar)} />
                        </Route>
                        <Route path={`${publicURL}/usuarios-alterar/:id`} element={<AuthorizeRoutes />}>
                            <Route path={`${publicURL}/usuarios-alterar/:id`} element={authenticatedContainer(UsuarioAlterar)} />
                        </Route>
                        <Route path={`${publicURL}/usuarios-visualizar/:id`} element={<AuthorizeRoutes />}>
                            <Route path={`${publicURL}/usuarios-visualizar/:id`} element={authenticatedContainer(UsuarioVisualizar)} />
                        </Route>
                        <Route path="*" element={<PaginaInexistente />} />
                    </Routes>
                </AuthProvider>
            </Fragment>
        </BrowserRouter>
    );
}

export default Rotas;