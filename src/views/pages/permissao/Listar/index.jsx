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
import {listarTodas} from '../../../../services/permissao';

const Listar = () => {
    const [atencao, setAtencao] = useState('');
    const [sucesso, setSucesso] = useState('');
    const [erro, setErro] = useState('');
    const [aguardando, setAguardando] = useState(false);
    const [confirmarAtivacao, setConfirmarAtivacao] = useState(false);
    const [idParaAtivar, setIdParaAtivar] = useState(null);
    const [confirmarDesativacao, setConfirmarDesativacao] = useState(false);
    const [idParaDesativar, setIdParaDesativar] = useState(null);
    const [permissoes, setPermissoes] = useState([]);
    const location = useLocation();

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
        await ativarUsuario({ id: idParaAtivar, ativo: true }, (retorno) => {
            if (retorno.erro.erro) {
                setErro({ mensagem: retorno.erro.mensagem });
            } else {
                setSucesso({ mensagem: retorno.erro.mensagem });
                setConfirmarAtivacao(false);
                pesquisarUsuarios();
            }
        });
        setAguardando(false);
    }

    const abrirConfirmarAtivacao = (id) => {
        setConfirmarAtivacao(true);
        setIdParaAtivar(id);
    }
    //#endregion -> Fim rotina de ativação

    //#region ->Início rotina de desativação
    const desativarUsuario = () => {
        setAguardando(true);
        ativarUsuario({ id: idParaDesativar, ativo: false }, (retorno) => {
            if (retorno.erro.erro) {
                setErro({ erro: retorno.erro.mensagem });
                setAguardando(false);
            } else {
                setSucesso({ mensagem: retorno.erro.mensagem });
                setAguardando(false);
                setConfirmarDesativacao(false);
                pesquisarUsuarios();
            }
        });
    }

    const abrirConfirmarDesativacao = (id) => {
        setConfirmarDesativacao(true);
        setIdParaDesativar(id);
    }
    //#endregion -> Fim rotina de desativação

    //Início da rotina de pesquisa
    const pesquisarUsuarios = async () => {
        setAguardando(true);
        const teste = await listarTodas();
        console.log(teste);
        setPermissoes([]);
        // await setTimeout(() => {
        //     console.log('Hello, World!');
        //     setPermissoes([
        //         {
        //             "id": 1,
        //             "nome": "listar_permissao",
        //             "descricao": "Permite visualizar todas as permissões.",
        //             "ativo": true,
        //             "data_cadastro": "2022-08-28T02:57:31.082Z",
        //             "data_operacao": "2022-08-28T02:57:31.082Z"
        //         },
        //         {
        //             "id": 2,
        //             "nome": "listar_usuario",
        //             "descricao": "Permite visualizar todos os Permissões.",
        //             "ativo": true,
        //             "data_cadastro": "2022-08-28T02:57:31.082Z",
        //             "data_operacao": "2022-08-28T02:57:31.082Z"
        //         },
        //         {
        //             "id": 3,
        //             "nome": "editar_usuario",
        //             "descricao": "Permite editar usuário.",
        //             "ativo": true,
        //             "data_cadastro": "2022-08-28T02:57:31.082Z",
        //             "data_operacao": "2022-08-28T02:57:31.082Z"
        //         },
        //         {
        //             "id": 4,
        //             "nome": "cadastrar_usuario",
        //             "descricao": "Permite cadastrar usuário.",
        //             "ativo": true,
        //             "data_cadastro": "2022-08-28T02:57:31.082Z",
        //             "data_operacao": "2022-08-28T02:57:31.082Z"
        //         },
        //         {
        //             "id": 5,
        //             "nome": "excluir_usuario",
        //             "descricao": "Permite excluir usuário.",
        //             "ativo": true,
        //             "data_cadastro": "2022-08-28T02:57:31.082Z",
        //             "data_operacao": "2022-08-28T02:57:31.082Z"
        //         },
        //         {
        //             "id": 6,
        //             "nome": "proprio_usuario",
        //             "descricao": "Permite acesso aos recursos apenas do perfil do próprio usuário.",
        //             "ativo": true,
        //             "data_cadastro": "2022-08-28T02:57:31.082Z",
        //             "data_operacao": "2022-08-28T02:57:31.082Z"
        //         }
        //     ]);
        //     setAguardando(false);
        // }, 3000);
        setAguardando(false);
    }

    return (
        <div>
            <ModalAtivar isOpen={confirmarAtivacao} toogle={() => setConfirmarAtivacao(false)} ativar='Permissão' aguardando={aguardando} ativarObjeto={() => ativarUsuario()} />
            <ModalDesativar isOpen={confirmarDesativacao} toogle={() => setConfirmarDesativacao(false)} desativar='Permissão' aguardando={aguardando} desativarObjeto={() => desativarUsuario()} />
            <div className="d-flex">
                <div className="mr-auto p-2">
                    <h2 className="display-4 titulo">Permissões</h2>
                </div>
                <AlertaErro erro={erro} />
                <AlertaAtencao atencao={atencao} />
                <AlertaSucesso sucesso={sucesso} />
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
                                            {permissao.ativo ? <BotaoDesativar onClick={() => abrirConfirmarDesativacao(permissao._id)} /> : <BotaoAtivar onClick={() => abrirConfirmarAtivacao(permissao._id)} />}
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