import React, { createContext, useEffect, useState } from "react";
import ModalCarregando from '../../views/components/ModalCarregando';

const Context = createContext();

const AuthProvider = ({ children }) => {

    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const getToken = async () => {
            const tokenLocal = localStorage.getItem('token');
            if (tokenLocal)
                setToken(tokenLocal);
            setLoading(false);
        }

        getToken();
    }, []);

    const handleLogout = async () => localStorage.removeItem('token');

    if (loading)
        return <ModalCarregando isOpen={true} pagina='Procurando usuário logado...' />;

    return (
        <Context.Provider value={{ token, handleLogout }}>
            {children}
        </Context.Provider>
    );
}

export { AuthProvider, Context };