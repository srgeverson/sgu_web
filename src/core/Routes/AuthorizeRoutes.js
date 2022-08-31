import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Context } from '../context';

const AuthorizeRoutes = () => {
    const { token } = useContext(Context);
    if (token)
        return <Outlet />
    else
        return <Navigate to='/sgu_web/' state={{ erro: true, mensagem: 'Usuário não autenticado!' }} replace />
}

export default AuthorizeRoutes;