import React, { createContext, useEffect, useState } from "react";

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

    if (loading) 
        return <h1>Procurando usuário logado...</h1>;

    return (
        <Context.Provider value={{ token }}>
            {children}
        </Context.Provider>
    );
}

export { AuthProvider, Context };