import React, { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { publicURL } from '../../../../core/config';
import BotaoConfirmar from '../../../components/BotaoConfirmar';
import AlertaErro from '../../../components/AlertaErro';
import UsuarioService from '../../../../services/UsuarioService';
import { useEffect } from 'react';
import AlertaAtencao from '../../../components/AlertaAtencao';
import AlertaSucesso from '../../../components/AlertaSucesso';
import ModalCarregando from '../../../components/ModalCarregando';

const UsuarioAlterar = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [ativo, setAtivo] = useState(false);
    const [atencao, setAtencao] = useState('');
    const [sucesso, setSucesso] = useState('');
    const [erro, setErro] = useState('');
    const [aguardando, setAguardando] = useState(false);
    const [formularioSucesso, setFormularioSucesso] = useState(false);
    const usuarioService = new UsuarioService();
    const { id } = useParams();

    useEffect(() => {
        receberDadosUsuario();
        // eslint-disable-next-line
    }, [id]);

    const receberDadosUsuario = async () => {
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
        } else {
            if (usuarioPorId) {
                setNome(usuarioPorId.nome);
                setEmail(usuarioPorId.email);
                setAtivo(usuarioPorId.ativo);
            }
        }
        setAguardando(false);
    }

    const alterarUsuario = async () => {
        setErro('');

        if (!criticas())
            return;

        setAguardando(true);
        const usuarioAlterado = await usuarioService.alterar(id, { nome, email, ativo });

        if (usuarioAlterado.statusCode) {
            if (usuarioAlterado.statusCode === 500) {
                setAtencao('');
                setErro({ mensagem: usuarioAlterado.message });
            } else {
                setErro('');
                setAtencao({ mensagem: usuarioAlterado.message });
            }
        } else {
            setSucesso({ mensagem: usuarioAlterado.message });
            setFormularioSucesso(true);
        }

        setAguardando(false);
    }

    const criticas = () => {
        return true;
    }

    if (formularioSucesso)
        return <Navigate to={`${publicURL}/usuarios`} state={{ mensagem: 'Usuário alterado com sucesso!' }} replace />

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
                    <h2 className="display-4 titulo">Alterar Usuário</h2>
                </div>
                <div className="mr-auto p-2">
                    <Link to={`${publicURL}/usuarios-visualizar/${id}`}>
                        <button className="ml-1 btn btn-outline-info btn-sm">
                            Visualisar
                        </button>
                    </Link>
                </div>
            </div>
            <hr />
            <AlertaErro erro={erro} />
            <AlertaAtencao atencao={atencao} />
            <AlertaSucesso sucesso={sucesso} />
            <ModalCarregando isOpen={aguardando} pagina='Processando solicitação' />
            <Form>
                <Input type="hidden"
                    value={id}
                    name="id"
                    id="id" />
                <FormGroup>
                    <Label for="nome">Nome</Label>
                    <Input
                        type="text"
                        value={nome}
                        name="nome"
                        id="nome"
                        className="form-control"
                        autoComplete="nome"
                        onChange={(ev) => setNome(ev.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="email">E-mail</Label>
                    <Input
                        type="email"
                        value={email}
                        name="email"
                        id="email"
                        className="form-control"
                        autoComplete="email"
                        onChange={(ev) => setEmail(ev.target.value)}
                    />
                </FormGroup>
                <FormGroup check inline>
                    <Label for="ativo" check>
                        <Input
                            type="checkbox"
                            checked={ativo}
                            value={ativo}
                            name="ativo"
                            id="ativo"
                            autoComplete="ativo"
                            onChange={() => setAtivo(!ativo)}
                        /> Ativo
                    </Label>
                </FormGroup>
                <br /><br />
                <Link onClick={() => alterarUsuario()} to="#">
                    <BotaoConfirmar aguardando={aguardando} />
                </Link>
            </Form>
        </div>
    )
}

export default UsuarioAlterar;