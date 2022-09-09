
import React from 'react';
import { Link } from 'react-router-dom';
import PeopleIcon from '@mui/icons-material/People';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import { publicURL } from '../../../core/config';

const MenuEsquerdo = ({ ativo }) => {
    return (
        <nav className={ativo ? "sidebar bg-secondary" : "sidebar bg-secondary toggled"}>
            <ul className="list-unstyled">
                <li><Link to={`${publicURL}/painel-de-controle`}><DashboardIcon /><span className='ms-1'>Painel de Controle</span></Link></li>
                <li><Link to={`${publicURL}/permissoes`}><PlaylistAddCheckIcon /><span className='ms-1'>Permissões</span></Link></li>
                <li><Link to={`${publicURL}/usuarios`}><PeopleIcon /><span className='ms-1'>Usuários</span></Link></li>
            </ul>
        </nav>
    );
}

export default MenuEsquerdo;