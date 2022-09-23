import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Context } from '../context';
import { publicURL } from '../config';

const AuthorizeRoutes = () => {
    const { token } = useContext(Context);
    if (token)
        return <Outlet />
    else
        return <Navigate to={`${publicURL}/`} state={{ erro: true, mensagem: 'Usuário não autenticado!' }} replace />
}

export default AuthorizeRoutes;