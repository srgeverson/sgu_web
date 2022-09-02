import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FormGroup } from 'reactstrap';
import AlertaErro from '../../../components/AlertaErro';
import AlertaAtencao from '../../../components/AlertaAtencao';
import AlertaSucesso from '../../../components/AlertaSucesso';
import BotaoAtivar from '../../../components/BotaoAtivar';
import BotaoDesativar from '../../../components/BotaoDesativar';
import BotaoPesquisar from '../../../components/BotaoPesquisar';
import ModalAtivar from '../../../components/ModalAtivar';
import ModalDesativar from '../../../components/ModalDesativar';
import ModalCarregando from '../../../components/ModalCarregando';
import PermissaoService from '../../../../services/PermissaoService';

const Listar = () => {
    const [atencao, setAtencao] = useState('');
    const [sucesso, setSucesso] = useState('');
    const [erro, setErro] = useState('');
    const [idParaAtivarOuDesativar, setIdParaAtivarOuDesativar] = useState('');
    const [aguardando, setAguardando] = useState(false);
    const [confirmarAtivacao, setConfirmarAtivacao] = useState(false);
    const [confirmarDesativacao, setConfirmarDesativacao] = useState(false);
    const [permissoes, setPermissoes] = useState([]);
    const location = useLocation();
    const permissaoService = new PermissaoService();

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
        const ativar = await permissaoService.ativar(idParaAtivarOuDesativar);
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
        const desativar = await permissaoService.desativar(idParaAtivarOuDesativar);
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
        const listarTodas = await permissaoService.listarTodas();
        if (listarTodas.statusCode) {
            if (listarTodas.statusCode === 500) {
                setAtencao('');
                setErro({ mensagem: listarTodas.message });
            } else {
                setErro('');
                setAtencao({ mensagem: listarTodas.message });
            }
        } else
            setPermissoes(listarTodas);
        setAguardando(false);
    }

    return (
        <div>
            <ModalAtivar isOpen={confirmarAtivacao} toogle={() => setConfirmarAtivacao(false)} ativar='Permissão' aguardando={aguardando} ativarObjeto={() => ativarUsuario()} />
            <ModalDesativar isOpen={confirmarDesativacao} toogle={() => setConfirmarDesativacao(false)} desativar='Permissão' aguardando={aguardando} desativarObjeto={() => desativarUsuario()} />
            <div className="d-flex justify-content-between">
                <div className="mr-auto p-2">
                    <h2 className="display-4 titulo">Permissões</h2>
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
                        <BotaoPesquisar onClickPesquisar={() => {
                            pesquisarUsuarios();
                        }} />
                    </FormGroup>
                </div>
            </div>
            <div className="table-responsive">
                <ModalCarregando isOpen={permissoes && aguardando} pagina='Processando solicitação' />
                <table className="table table-hover table-striped">
                    <thead>
                        <tr>
                            <th className="d-none d-sm-table-cell">Código</th>
                            <th>Nome</th>
                            <th className="d-none d-sm-table-cell">Descrição</th>
                            <th className="text-center">Opções</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            permissoes.map(
                                (permissao) => (
                                    <tr key={permissao.id} >
                                        <th className="d-none d-sm-table-cell">{permissao.id}</th>
                                        <th>{permissao.nome}</th>
                                        <td className="d-none d-sm-table-cell">{permissao.descricao}</td>
                                        <td className="text-center">
                                            {
                                                permissao.ativo ?
                                                    <BotaoDesativar onClick={() => abrirConfirmarDesativacao(permissao.id)} /> :
                                                    <BotaoAtivar onClick={() => abrirConfirmarAtivacao(permissao.id)} />
                                            }
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