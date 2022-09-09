import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { Spinner } from 'reactstrap';
import UsuarioService from '../../../../services/UsuarioService';
import AlertaAtencao from '../../../components/AlertaAtencao';
import AlertaErro from '../../../components/AlertaErro';
import { publicURL } from '../../../../core/config';

const UsuarioVisualizar = () => {
    const { id } = useParams();
    const [usuario, setUsuario] = useState(null);
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
        if (usuarioPorId.statusCode) {
            if (usuarioPorId.statusCode === 500) {
                setAtencao('');
                setErro({ mensagem: usuarioPorId.message });
            } else {
                setErro('');
                setAtencao({ mensagem: usuarioPorId.message });
            }
        } else
            setUsuario(usuarioPorId);
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
                    <dl className="row">
                        <dt className="col-sm-4">Código</dt>
                        <dd className="col-sm-8">{usuario.id}</dd>

                        <dt className="col-sm-4">Nome</dt>
                        <dd className="col-sm-8">{usuario.nome}</dd>

                        <dt className="col-sm-4">E-mail</dt>
                        <dd className="col-sm-8">{usuario.email}</dd>

                        <dt className="col-sm-4">Data do Cadastrado</dt>
                        <dd className="col-sm-8">{usuario.dataCriacao && format(new Date(usuario.dataCriacao), 'dd/MM/yyyy hh:mm:ss', { locale: pt })}</dd>

                        <dt className="col-sm-4">Última Alteração</dt>
                        <dd className="col-sm-8">{usuario.dataAlteracao && format(new Date(usuario.updatedAt), 'dd/MM/yyyy hh:mm:ss', { locale: pt })}</dd>

                        <dt className="col-sm-4">Status</dt>
                        <dd className="col-sm-8">{usuario.ativo ? "Ativo" : "Inativo"}</dd>
                    </dl>
                    :
                    <div className="d-flex justify-content-center"><Spinner color="info" /><span className="ml-1">Aguarde...</span></div>
            }
        </div>
    );
}

export default UsuarioVisualizar;