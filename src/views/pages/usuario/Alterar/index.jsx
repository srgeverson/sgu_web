import React, { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import BotaoConfirmar from '../../../components/BotaoConfirmar';
import AlertaErro from '../../../components/AlertaErro';
import UsuarioService from '../../../../services/UsuarioService';
import { useEffect } from 'react';
import AlertaAtencao from '../../../components/AlertaAtencao';
import AlertaSucesso from '../../../components/AlertaSucesso';

const UsuarioAlterar = () => {
    const [ativo, setAtivo] = useState(false);
    const [atencao, setAtencao] = useState('');
    const [sucesso, setSucesso] = useState('');
    const [erro, setErro] = useState('');
    const [aguardando, setAguardando] = useState(false);
    const [usuario, setUsuario] = useState('')
    const [formularioSucesso, setFormularioSucesso] = useState(false);
    const usuarioService = new UsuarioService();
    const { id } = useParams();

    useEffect(() => {
        receberDadosUsuario();
        // eslint-disable-next-line
    }, [id]);

    const receberDadosUsuario = async () => {
        console.log(id)
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

    const alterarUsuario = async () => {
        setErro('');

        if (!criticas())
            return;

        setAguardando(true);
        const usuarioAlterado = await usuarioService.alterar(id, { nome: usuario.nome, email: usuario.email, ativo });

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

    const onChangeInput = (field, ev) => {
       setUsuario({ [field]: ev.target.value });
    }

    if (formularioSucesso)
        return <Navigate to='/sgu_web/usuarios' state={{ mensagem: 'Usuário alterado com sucesso!' }} replace />

    return (
        <div>
            <div className="d-flex justify-content-between">
                <div className="mr-auto p-2">
                    <Link to={"/sgu_web/usuarios"}>
                        <button className="btn btn-outline-success btn-sm">
                            Listar
                        </button>
                    </Link>
                </div>
                <div className="mr-auto p-2">
                    <h2 className="display-4 titulo">Alterar Usuário</h2>
                </div>
                <div className="mr-auto p-2">
                    <Link to={`/sgu_web/usuarios-visualizar/${id}`}>
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
            <Form>
                <Input type="hidden"
                    value={id}
                    name="id"
                    id="id" />
                <FormGroup>
                    <Label for="nome">Nome</Label>
                    <Input
                        type="text"
                        value={usuario.nome}
                        name="nome"
                        id="nome"
                        className="form-control"
                        placeholder={usuario ? "Nome do usuário" : "Carregado..."}
                        disabled={usuario ? false : true}
                        autoComplete="nome"
                        onChange={(ev) => onChangeInput("nome", ev)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="email">E-mail</Label>
                    <Input
                        type="email"
                        value={usuario.email}
                        name="email"
                        id="email"
                        className="form-control"
                        placeholder={usuario ? "E-mail do usuário" : "Carregando.."}
                        disabled={usuario ? false : true}
                        autoComplete="email"
                        onChange={(ev) => onChangeInput("email", ev)}
                    />
                </FormGroup>
                <FormGroup check inline>
                    <Label for="ativo" check>
                        <Input
                            type="checkbox"
                            checked={ativo ? true : false}
                            value={ativo}
                            name="ativo"
                            id="ativo"
                            disabled={usuario ? false : true}
                            autoComplete="ativo"
                            onClick={setAtivo}
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