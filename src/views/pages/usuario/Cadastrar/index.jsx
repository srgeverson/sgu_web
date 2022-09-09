import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { publicURL } from '../../../../core/config';
import BotaoConfirmar from '../../../components/BotaoConfirmar';
import AlertaErro from '../../../components/AlertaErro';
import UsuarioService from '../../../../services/UsuarioService';
import AlertaAtencao from '../../../components/AlertaAtencao';
import AlertaSucesso from '../../../components/AlertaSucesso';
import ModalCarregando from '../../../components/ModalCarregando';

const UsuarioCadastrar = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [senhaConfirma, setSenhaConfirma] = useState('');
    const [atencao, setAtencao] = useState('');
    const [sucesso, setSucesso] = useState('');
    const [erro, setErro] = useState('');
    const [aguardando, setAguardando] = useState(false);
    const [formularioSucesso, setFormularioSucesso] = useState(false);
    const usuarioService = new UsuarioService();

    const cadastrarUsuario = async () => {
        setErro('');

        if (!criticas())
            return;

        setAguardando(true);
        const usuarioCadastrado = await usuarioService.cadastrar( { nome, email, senha });
        if (usuarioCadastrado.statusCode) {
            if (usuarioCadastrado.statusCode === 500) {
                setAtencao('');
                setErro({ mensagem: usuarioCadastrado.message });
            } else {
                setErro('');
                setAtencao({ mensagem: usuarioCadastrado.message });
            }
        } else {
            setSucesso({ mensagem: usuarioCadastrado.message });
            setFormularioSucesso(true);
        }

        setAguardando(false);
    }

    const criticas = () => {
        if (!email) return setAtencao({ mensagem: "Preencha o campo e-mail!" });
        if (!senha) return setAtencao({ mensagem: "Preencha o campo senha!" });
        if (!senhaConfirma) return setAtencao({ mensagem: "Preencha o campo confirma senha!" });
        if (senha !== senhaConfirma) return setAtencao({ mensagem: "As senhas não são iguais!" });
        return true;
    }

    if (formularioSucesso)
        return <Navigate to={`${publicURL}/usuarios`} state={{ mensagem: 'Usuário cadastrado com sucesso!' }} replace />

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
                    <h2 className="display-4 titulo">Cadastrar Usuário</h2>
                </div>
                <div className="mr-auto p-2" />
            </div>
            <hr />
            <AlertaErro erro={erro} />
            <AlertaAtencao atencao={atencao} />
            <AlertaSucesso sucesso={sucesso} />
            <ModalCarregando isOpen={aguardando} pagina='Processando solicitação' />
            <Form>
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
                <FormGroup>
                    <Label for="senha">Senha</Label>
                    <Input
                        type="password"
                        value={senha}
                        name="senha"
                        id="senha"
                        placeholder="Senha do usuário"
                        onChange={(ev) => setSenha(ev.target.value)} required />
                </FormGroup>
                <FormGroup>
                    <Label for="senha">Confirma senha</Label>
                    <Input
                        type="password"
                        value={senhaConfirma}
                        name="senhaConfirma"
                        id="senhaConfirma"
                        placeholder="Confirmar senha do usuário"
                        onChange={(ev) => setSenhaConfirma(ev.target.value)} required />
                </FormGroup>
                <br /><br />
                <Link onClick={() => cadastrarUsuario()} to="#">
                    <BotaoConfirmar aguardando={aguardando} />
                </Link>
            </Form>
        </div>
    )
}

export default UsuarioCadastrar;