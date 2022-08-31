import React, { useState, useContext } from 'react';
// import { connect } from 'react-redux';
// import * as  actionsUsuario from '../../../domain/actions/actionsUsuario';
import BarraDeFerramentas from '../../../views/components/BarraDeFerramentas';
import BarraDeMenu from '../../../views/components/MenuEsquerdo';
import '../../../assets/styles/childrenAuthenticated.css';
import { Context } from '../../context';

const ChildrenAuthenticated = (props) => {
    const [menuAberto, setMenuAberto] = useState(true);
    const { handleLogout } = useContext(Context);

    return (
        <div>
            <BarraDeFerramentas handleLogout={handleLogout} dadosUsuario={props.children} alternarMenu={() => setMenuAberto(!menuAberto)} />
            <div className="d-flex">
                <BarraDeMenu ativo={menuAberto} />
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