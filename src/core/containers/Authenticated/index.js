import React from 'react';
import ChildrenAuthenticated from './children';

const AuthenticatedContainer = Component => {
   
    return (
        <ChildrenAuthenticated>
            <Component />
        </ChildrenAuthenticated>
    );
}

export default AuthenticatedContainer;