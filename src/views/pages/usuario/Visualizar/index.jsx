import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import UsuarioService from '../../../../services/UsuarioService';
import AlertaAtencao from '../../../components/AlertaAtencao';
import AlertaErro from '../../../components/AlertaErro';
import { publicURL } from '../../../../core/config';
import ModalCarregando from '../../../components/ModalCarregando';

const UsuarioVisualizar = () => {
    const { id } = useParams();
    const [usuario, setUsuario] = useState(null);
    const [permissoes, setPermissoes] = useState([]);
    const [atencao, setAtencao] = useState('');
    const [erro, setErro] = useState('');
    const usuarioService = new UsuarioService();
    const [aguardando, setAguardando] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (location && location.state) {
            if (location.state.erro === true)
                setErro({ mensagem: location.state.mensagem });
            else if (location.state.alerta === true)
                setAtencao({ mensagem: location.state.mensagem });
        }
        getUsuario(id);
        // eslint-disable-next-line
    }, []);

    const getUsuario = async (id) => {
        setAguardando(true);
        const usuarioPorId = await usuarioService.buscarPorId(id);
        const permissoesPorIdUsuario = await usuarioService.buscarPermissoesPorIdUsuario(id);
        if (usuarioPorId.statusCode || permissoesPorIdUsuario.statusCode) {
            if (usuarioPorId.statusCode === 500 ||
                permissoesPorIdUsuario.statusCode === 500) {
                setAtencao('');
                setErro({ mensagem: usuarioPorId.message + ' ' + permissoesPorIdUsuario.statusCode });
            } else {
                setErro('');
                setAtencao({ mensagem: usuarioPorId.message + ' ' + permissoesPorIdUsuario.statusCode });
            }
        } else {
            setUsuario(usuarioPorId);
            if (permissoesPorIdUsuario[0].permissoes)
                setPermissoes(permissoesPorIdUsuario[0].permissoes);
        }
        setAguardando(false);
    }

    return (
        <div>
            <div className="d-flex justify-content-between">
                <div className="mr-auto p-2">
                    <Link to={`${publicURL}/usuarios`}>
                        <button className="btn btn-outline-success btn-sm">
                            Listar
                        </button>
                    </Link>
                </div>
                <div className="mr-auto p-2">
                    <h2 className="display-4 titulo">Detalhes do Usuário</h2>
                    <AlertaErro erro={erro} />
                    <AlertaAtencao atencao={atencao} />
                </div>
                <div className="mr-auto p-2">
                    <Link to={`${publicURL}/usuarios-alterar/${id}`}>
                        <button className="ml-1 btn btn-outline-warning btn-sm">
                            Editar
                        </button>
                    </Link>
                </div>
            </div>
            <hr />
            {
                usuario && !aguardando ?
                    <div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control-plaintext" id="id" placeholder="Código" value={usuario.id} onChange={() => { }} />
                            <label htmlFor="id">Código</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control-plaintext" id="nome" placeholder="Nome" value={usuario.nome} onChange={() => { }} />
                            <label htmlFor="nome">Nome</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control-plaintext" id="email" placeholder="E-mail" value={usuario.email} onChange={() => { }} />
                            <label htmlFor="email">E-mail</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="date" className="form-control-plaintext" id="dataCriacao" placeholder="Data do Cadastrado" value={usuario.dataCriacao && format(new Date(usuario.dataCriacao), 'dd/MM/yyyy hh:mm:ss', { locale: pt })} onChange={() => { }} />
                            <label htmlFor="dataCriacao">Data do Cadastrado</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="date"
                                className="form-control-plaintext"
                                id="dataAlteracao"
                                placeholder="Última Alteração"
                                value={usuario.dataAlteracao && format(new Date(usuario.dataAlteracao), 'dd/MM/yyyy hh:mm:ss', { locale: pt })}
                                onChange={() => { }}
                            />
                            <label htmlFor="dataAlteracao">Última Alteração</label>
                        </div>
                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" role="switch" name="ativo" id="ativo" checked={usuario.ativo} disabled onChange={() => { }} />
                            <label className="form-check-label" htmlFor="ativo">
                                Ativo
                            </label>
                        </div>
                        <br />
                        <div className="form-floating mb-3">
                            <label htmlFor="permissoes">
                                Permissões
                            </label>
                            {
                                permissoes && permissoes.length > 0 ?
                                    <ul className="list-group list-group-numbered">
                                        {
                                            permissoes.map((p) => {
                                                return <li key={p.id} className="list-group-item d-flex justify-content-between align-items-start">
                                                    <div className="ms-2 me-auto">
                                                        <div className="fw-bold">{p.nome}</div>
                                                        {p.descricao}
                                                    </div>
                                                    <span className="badge bg-primary rounded-pill">Código: {p.id}</span>
                                                </li>
                                            })
                                        }
                                    </ul> :
                                    'Não possui permissão cadastrada'
                            }
                        </div>
                    </div>
                    :
                    <ModalCarregando isOpen={aguardando} pagina='Processando solicitação' />
            }
        </div>
    );
}

export default UsuarioVisualizar;