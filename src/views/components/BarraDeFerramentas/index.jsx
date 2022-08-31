import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import iconeUsuario from '../../../assets/images/icone_usuario.png';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import '../../../assets/styles/barraDeFerramentas.css';

const BarraDeFerramentas = ({ handleLogout, dadosUsuario, alternarMenu }) => {
    var primeiroNome = "Usuário";
    // if (dadosUsuario.children.props.usuario) {
    //     [primeiroNome] = dadosUsuario.children.props.usuario.nome.split(' ');
    // }
    return (
            <Navbar color="success navbar-dark" light expand="md">
                <span className="navbar-toggler-icon cursor mr-1" onClick={() => alternarMenu()}></span>
                <Link className="navbar-brand" to="/sac/pagina-inicial">SGU - Sistema de Gestão de Usuários</Link>
                <Nav className="ml-auto logo-barra-de-ferramentas" navbar>
                    <NavItem className="mr-1">
                        <img
                            className="rounded-circle mt-2"
                            src={iconeUsuario}
                            width="20" height="20" alt="Usuario" />
                    </NavItem>
                    <UncontrolledDropdown setActiveFromChild>
                        <DropdownToggle tag="a" className="nav-link menu-header cursor" caret>
                            {primeiroNome}
                        </DropdownToggle>
                        <DropdownMenu end>
                            <Link className="dropdown-item" to="/sac/perfil"><AssignmentIndIcon /> Perfil</Link>
                            <DropdownItem onClick={() => handleLogout()}><MeetingRoomIcon /> Sair</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>
            </Navbar>
    );
}

export default BarraDeFerramentas;