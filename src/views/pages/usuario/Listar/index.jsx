import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { DropdownMenu, DropdownToggle, FormGroup, UncontrolledButtonDropdown } from 'reactstrap';
import { publicURL } from '../../../../core/config';
import AlertaErro from '../../../components/AlertaErro';
import AlertaAtencao from '../../../components/AlertaAtencao';
import AlertaSucesso from '../../../components/AlertaSucesso';
import BotaoAtivar from '../../../components/BotaoAtivar';
import BotaoCadastrar from '../../../components/BotaoCadastrar';
import BotaoEditar from '../../../components/BotaoEditar';
import BotaoDesativar from '../../../components/BotaoDesativar';
import BotaoPesquisar from '../../../components/BotaoPesquisar';
import ModalAtivar from '../../../components/ModalAtivar';
import ModalDesativar from '../../../components/ModalDesativar';
import ModalCarregando from '../../../components/ModalCarregando';
import UsuarioService from '../../../../services/UsuarioService';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const Listar = () => {
    const [atencao, setAtencao] = useState('');
    const [sucesso, setSucesso] = useState('');
    const [erro, setErro] = useState('');
    const [idParaAtivarOuDesativar, setIdParaAtivarOuDesativar] = useState('');
    const [aguardando, setAguardando] = useState(false);
    const [confirmarAtivacao, setConfirmarAtivacao] = useState(false);
    const [confirmarDesativacao, setConfirmarDesativacao] = useState(false);
    const [usuarios, setUsuarios] = useState([]);
    const location = useLocation();
    const usuarioService = new UsuarioService();

    useEffect(() => {
        if (location && location.state) {
            if (location.state.erro === true)
                setErro({ mensagem: location.state.mensagem });
            else if (location.state.alerta === true)
                setAtencao({ mensagem: location.state.mensagem });
            else
                setSucesso({ mensagem: location.state.mensagem });
        }
        // eslint-disable-next-line
    }, []);

    //#region -> Início rotina de ativação
    const ativarUsuario = async () => {
        setAguardando(true);
        const ativar = await usuarioService.ativar(idParaAtivarOuDesativar);
        if (ativar.statusCode) {
            if (ativar.statusCode === 500) {
                setAtencao('');
                setSucesso('');
                setErro({ mensagem: ativar.message });
            } else {
                setErro('');
                setSucesso('');
                setAtencao({ mensagem: ativar.message });
            }
        } else {
            setSucesso({ mensagem: 'Sucesso!' });
            setConfirmarAtivacao(false);
            pesquisarUsuarios();
        }
        setAguardando(false);
    }

    const abrirConfirmarAtivacao = (id) => {
        setConfirmarAtivacao(true);
        setIdParaAtivarOuDesativar(id);
    }
    //#endregion -> Fim rotina de ativação

    //#region ->Início rotina de desativação
    const desativarUsuario = async () => {
        setAguardando(true);
        const desativar = await usuarioService.desativar(idParaAtivarOuDesativar);
        if (desativar.statusCode) {
            if (desativar.statusCode === 500) {
                setAtencao('');
                setSucesso('');
                setErro({ mensagem: desativar.message });
            } else {
                setErro('');
                setSucesso('');
                setAtencao({ mensagem: desativar.message });
            }
        } else {
            setSucesso({ mensagem: 'Sucesso!' });
            setConfirmarDesativacao(false);
            pesquisarUsuarios();
        }
        setAguardando(false);
    }

    const abrirConfirmarDesativacao = (id) => {
        setConfirmarDesativacao(true);
        setIdParaAtivarOuDesativar(id);
    }
    //#endregion -> Fim rotina de desativação

    //Início da rotina de pesquisa
    const pesquisarUsuarios = async () => {
        setAguardando(true);
        const listarTodas = await usuarioService.listarTodas();
        if (listarTodas.statusCode) {
            if (listarTodas.statusCode === 500) {
                setAtencao('');
                setErro({ mensagem: listarTodas.message });
            } else {
                setErro('');
                setAtencao({ mensagem: listarTodas.message });
            }
        } else
            setUsuarios(listarTodas);
        setAguardando(false);
    }

    return (
        <div>
            <ModalAtivar isOpen={confirmarAtivacao} toogle={() => setConfirmarAtivacao(false)} ativar='Permissão' aguardando={aguardando} ativarObjeto={() => ativarUsuario()} />
            <ModalDesativar isOpen={confirmarDesativacao} toogle={() => setConfirmarDesativacao(false)} desativar='Permissão' aguardando={aguardando} desativarObjeto={() => desativarUsuario()} />
            <div className="d-flex justify-content-between">
                <div className="mr-auto p-2">
                    <h2 className="display-4 titulo">Usuário</h2>
                </div>
                <div className="mr-auto p-2">
                    <AlertaErro erro={erro} />
                    <AlertaAtencao atencao={atencao} />
                    <AlertaSucesso sucesso={sucesso} />
                </div>
            </div>
            <hr />
            <div className="form-group row">
                <div className="col-sm-2">
                    <FormGroup>
                        <BotaoPesquisar onClickPesquisar={() => pesquisarUsuarios()} />
                    </FormGroup>
                </div>
                <div className="col-sm-2">
                    <FormGroup>
                        <BotaoCadastrar uri={`${publicURL}/usuarios-cadastrar`} descricaoObjeto='Usuario' />
                    </FormGroup>
                </div>
            </div>
            <div className="table-responsive">
                <ModalCarregando isOpen={usuarios && aguardando} pagina='Processando solicitação' />
                <table className="table table-hover table-striped">
                    <thead>
                        <tr>
                            <th className="d-none d-sm-table-cell">Código</th>
                            <th>Nome</th>
                            <th className="d-none d-sm-table-cell">E-mail</th>
                            <th className="text-center">Opções</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            usuarios.map(
                                (usuario) => (
                                    <tr key={usuario.id} >
                                        <th className="d-none d-sm-table-cell">{usuario.id}</th>
                                        <th>{usuario.nome}</th>
                                        <td className="d-none d-sm-table-cell">{usuario.email}</td>
                                        <td className="text-center">
                                            <span className="d-none d-md-block">
                                                <BotaoEditar uri={`${publicURL}/usuarios-alterar/${usuario.id}`} />
                                                {usuario.ativo ?
                                                    <BotaoDesativar onClick={() => abrirConfirmarDesativacao(usuario.id)} /> :
                                                    <BotaoAtivar onClick={() => abrirConfirmarAtivacao(usuario.id)} />}
                                            </span>
                                            <div className="dropdown d-block d-md-none">
                                                <UncontrolledButtonDropdown>
                                                    <DropdownToggle outline size="sm">
                                                        <MoreVertIcon />
                                                    </DropdownToggle>
                                                    <DropdownMenu>
                                                        <BotaoEditar uri={`${publicURL}/usuarios-alterar/${usuario.id}`} />
                                                        {usuario.ativo ?
                                                            <BotaoDesativar onClick={() => abrirConfirmarDesativacao(usuario.id)} /> :
                                                            <BotaoAtivar onClick={() => abrirConfirmarAtivacao(usuario.id)} />}
                                                    </DropdownMenu>
                                                </UncontrolledButtonDropdown>

                                                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="acoesListar">

                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Listar;