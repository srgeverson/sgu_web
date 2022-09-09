import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Form, InputGroup, InputGroupText, FormGroup, Input } from 'reactstrap';
import logo_sistema from '../../../../assets/images/logo_sistema.png';
import BotaoEnviar from '../../../components/BotaoEnviar';
import AlertaAtencao from '../../../components/AlertaAtencao';
import AlertaErro from '../../../components/AlertaErro';
import { authorizationServerRecuperarSenha } from '../../../../core/api';
import { publicURL } from '../../../../core/config';

const RecuperarSenha = () => {
    const [email, setEmail] = useState("");
    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState("");
    const [atencao, setAtencao] = useState("");
    const [aguardando, setAguardando] = useState(false);
    const [formularioSucesso, setFormularioSucesso] = useState(false);

    const criticas = () => {
        if (!email) return setAtencao({ mensagem: "Preencha o campo e-mail!" });
        return true;
    }

    const recuperaSenha = async (e) => {
        e.preventDefault();

        if (!criticas())
            return;

        const dados = { email };

        setAguardando(true);

        await authorizationServerRecuperarSenha()
            .put('/usuarios/recuperar-acesso', dados)
            .then((response) => {
                setErro('');
                setAtencao('');
                if (response.data)
                    setSucesso({ email, mensagem: response.data.mensagem });
                setFormularioSucesso(true);
            })
            .catch((error) => {
                if (error.response.data) {
                    if (error.response.data.statusCode === 400) {
                        setSucesso('');
                        setErro('');
                        setAtencao({ mensagem: error.response.data.message });
                    }
                } else {
                    setSucesso('');
                    setAtencao('');
                    setErro({ mensagem: 'Ocorreu um erro interno, tente novamente se o problema persistir contate o administrador do sistema!' });
                }
            });
    }

    if (formularioSucesso)
        return <Navigate to='/sgu_web/validar-acesso' state={sucesso} replace />

    return (
        <div className="container-login">
            <div className="login card shadow">
                <Form onSubmit={recuperaSenha} className="form-signin text-center">
                    <img className="mb-4" src={logo_sistema} alt="logo" width="72" height="72" />
                    <h1 className="h3 mb-3 font-weight-normal">Recuperar Senha</h1>
                    <AlertaErro erro={erro} />
                    <AlertaAtencao atencao={atencao} />
                    <FormGroup>
                        <InputGroup>
                            <InputGroupText>E-mail</InputGroupText>
                            <Input
                                type="email"
                                value={email}
                                name="email"
                                id="email"
                                placeholder="E-mail do usuário"
                                onChange={(ev) => setEmail(ev.target.value)} required />
                        </InputGroup>
                    </FormGroup>
                    <BotaoEnviar aguardando={aguardando} />
                    <p className="text-center mt-2">
                        <Link to={`${publicURL}/`} className='remove-sublinhado'>Login</Link>
                    </p>
                </Form>
            </div>
        </div>
    );
}

export default RecuperarSenha;