
import React from 'react';
import { Link } from 'react-router-dom';
import PeopleIcon from '@mui/icons-material/People';
import DashboardIcon from '@mui/icons-material/Dashboard';

const MenuEsquerdo = ({ ativo }) => {
    return (
        <nav className={ativo ? "sidebar bg-secondary" : "sidebar bg-secondary toggled"}>
            <ul className="list-unstyled">
                <li><Link to="/sgu_web/painel-de-controle"><DashboardIcon /><span className='ms-1'>Painel de Controle</span></Link></li>
                <li><Link to="/sgu_web/usuarios"><PeopleIcon/><span className='ms-1'>Usuários</span></Link></li>
            </ul>
        </nav>
    );
}

export default MenuEsquerdo;