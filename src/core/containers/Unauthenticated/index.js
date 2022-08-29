import React from 'react';
import ChildrenUnauthenticated from './children';

const UnauthenticatedContainer = Component => {

    return (
        <ChildrenUnauthenticated>
            <Component />
        </ChildrenUnauthenticated>
    )
}

export default UnauthenticatedContainer;