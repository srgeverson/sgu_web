import React, { useState } from 'react';
// import { connect } from 'react-redux';
// import * as  actionsUsuario from '../../../domain/actions/actionsUsuario';
import BarraDeFerramentas from '../../../views/components/BarraDeFerramentas';
// import BarraDeMenu from '../../../views/components/BarraDeMenu';
import '../../../assets/styles/childrenAuthenticated.css';

const ChildrenAuthenticated = (props) => {
    const [menuAberto, setMenuAberto] = useState(true);

    return (
        <div>
            <BarraDeFerramentas handleLogout={props.handleLogout} dadosUsuario={props.children} alternarMenu={() => setMenuAberto(!menuAberto)} />
            <div className="d-flex">
                {/* <BarraDeMenu handleLogout={props.handleLogout} ativo={menuAberto} /> */}
                <div className="content p-1">
                    <div className="list-group-item">
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChildrenAuthenticated;