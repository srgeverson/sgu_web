import React from 'react';
import '../../../assets/styles/childrenUnauthenticated.css';

const ChildrenUnauthenticated = (props) => {
    return (
        <div className="container-login">
            <div className="login">
                {props.children}
            </div>
        </div>
    );
}

export default ChildrenUnauthenticated;