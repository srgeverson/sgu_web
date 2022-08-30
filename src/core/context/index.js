import React, { createContext, useEffect, useState } from "react";

const Context = createContext();

const AuthProvider = ({ children }) => {

    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const getToken = async () => {
            const token = localStorage.getItem('token');
            if (token)
                setAuthenticated(true);
        }
        getToken();
    }, []);

    return (
        <Context.Provider value={{ authenticated }}>
            {children}
        </Context.Provider>
    );
}

export { AuthProvider, Context };