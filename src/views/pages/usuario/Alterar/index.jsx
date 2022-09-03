import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import BotaoConfirmar from '../../../components/BotaoConfirmar';
import AlertaErro from '../../../components/AlertaErro';
import UsuarioService from '../../../../services/UsuarioService';
import { useEffect } from 'react';
import AlertaAtencao from '../../../components/AlertaAtencao';
import AlertaSucesso from '../../../components/AlertaSucesso';

const UsuarioAlterar = () => {
    const [id, setId] = useState('');
    const [email, setEmail] = useState('');
    const [nome, setNome] = useState('');
    const [ativo, setAtivo] = useState(false);
    const [atencao, setAtencao] = useState('');
    const [sucesso, setSucesso] = useState('');
    const [erro, setErro] = useState('');
    const [aguardando, setAguardando] = useState(false);
    const [usuario, setUsuario] = useState(false,)
    const [formularioSucesso, setFormularioSucesso] = useState(false);
    const usuarioService = new UsuarioService();

    useEffect(() => {
        receberDadosUsuario();
        // eslint-disable-next-line
    }, []);

    const receberDadosUsuario = async () => {
        const { id } = this.props.match.params;
        setAguardando(true);
        setId(id);
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
        const usuarioAlterado = await usuarioService.alterarUsuario({ id, nome, email, ativo });
        
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
        const { nome, email } = this.state;
        if (!nome) return setAtencao({ mensagem: "Preencha o campo nome!" });
        if (!email) return setAtencao({ mensagem: "Preencha o campo e-mail!" });
        return true;
    }

    if (formularioSucesso)
        return <Navigate to='/usuarios' state={{ mensagem: 'Usuário alterado com sucesso!' }} replace />

    return (
        <div>
            <div className="d-flex">
                <div className="mr-auto p-2">
                    <h2 className="display-4 titulo">Alterar Usuário</h2>
                </div>
                <Link to={"/usuarios"}>
                    <button className="btn btn-outline-success btn-sm">
                        Listar
                    </button>
                </Link>

                <Link to={"/usuarios-visualizar/" + 1}>
                    <button className="ml-1 btn btn-outline-info btn-sm">
                        Visualisar
                    </button>
                </Link>
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
                        value={nome}
                        name="nome"
                        id="nome"
                        className="form-control"
                        placeholder={usuario ? "Nome do usuário" : "Carregado..."}
                        disabled={usuario ? false : true}
                        autoComplete="nome"
                        onChange={setNome}
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
                        placeholder={usuario ? "E-mail do usuário" : "Carregando.."}
                        disabled={usuario ? false : true}
                        autoComplete="email"
                        onChange={setEmail}
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