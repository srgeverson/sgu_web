import React, { useEffect, useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { Form, FormGroup, Input, InputGroup, InputGroupText } from 'reactstrap';
import logo_sistema from '../../../../assets/images/logo_sistema.png';
import AlertaErro from '../../../components/AlertaErro';
import AlertaAtencao from '../../../components/AlertaAtencao';
import AlertaSucesso from '../../../components/AlertaSucesso';
import BotaoValidar from '../../../components/BotaoValidar';
import { authorizationServerRecuperarSenha } from '../../../../core/api';
import { publicURL } from '../../../../core/config';

const Login = () => {
    const [codigo, setCodigo] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [senhaConfirma, setSenhaConfirma] = useState('');
    const [atencao, setAtencao] = useState('');
    const [sucesso, setSucesso] = useState('');
    const [erro, setErro] = useState('');
    const [aguardando, setAguardando] = useState(false);
    const [formularioSucesso, setFormularioSucesso] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (location && location.state) {
            setEmail(location.state.email)
            setSucesso({ mensagem: location.state.mensagem });
        }
        // eslint-disable-next-line
    }, []);

    const validarAcesso = async (e) => {
        e.preventDefault();

        if (!criticas())
            return;

        const dados = { codigoAcesso: codigo, email, senha };

        setAguardando(true);

        await authorizationServerRecuperarSenha()
            .put('/usuarios/validar-acesso', dados)
            .then(() => {
                setErro('');
                setAtencao('');
                setSucesso({ email, mensagem: 'Acesso validado com sucesso, agora aproveite nosso sistema!' });
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

        setAguardando(false);
    }

    const criticas = () => {
        if (!codigo) return setAtencao({ mensagem: "Preencha o campo código!" });
        if (!email) return setAtencao({ mensagem: "Preencha o campo e-mail!" });
        if (!senha) return setAtencao({ mensagem: "Preencha o campo senha!" });
        if (!senhaConfirma) return setAtencao({ mensagem: "Preencha o campo confirma senha!" });
        if (senha !== senhaConfirma) return setAtencao({ mensagem: "As senhas não são iguais!" });
        return true;
    }

    if (formularioSucesso)
        return <Navigate to={`${publicURL}/`} state={sucesso} replace />

    return (
        <div className="container-login">
            <div className="login card shadow">
                <Form onSubmit={validarAcesso} className="form-signin text-center">
                    <img className="mb-4" src={logo_sistema} alt="logo" width="72" height="72" />
                    <h1 className="h3 mb-3 font-weight-normal">Validação de Aecsso</h1>
                    <AlertaErro erro={erro} />
                    <AlertaAtencao atencao={atencao} />
                    <AlertaSucesso sucesso={sucesso} />
                    <FormGroup>
                        <InputGroup>
                            <InputGroupText>Código</InputGroupText>
                            <Input
                                type="text"
                                value={codigo}
                                name="codigo"
                                id="codigo"
                                placeholder="Código de validação"
                                onChange={(ev) => setCodigo(ev.target.value)} required />
                        </InputGroup>
                    </FormGroup>
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
                    <FormGroup>
                        <InputGroup>
                            <InputGroupText style={{ height: 46 }}>Senha</InputGroupText>
                            <Input
                                type="password"
                                value={senha}
                                name="senha"
                                id="senha"
                                placeholder="Senha do usuário"
                                onChange={(ev) => setSenha(ev.target.value)} required />
                        </InputGroup>
                    </FormGroup>
                    <FormGroup>
                        <InputGroup>
                            <InputGroupText style={{ height: 46 }}>Confirma senha</InputGroupText>
                            <Input
                                type="password"
                                value={senhaConfirma}
                                name="senhaConfirma"
                                id="senhaConfirma"
                                placeholder="Confirmar senha do usuário"
                                onChange={(ev) => setSenhaConfirma(ev.target.value)} required />
                        </InputGroup>
                    </FormGroup>
                    <BotaoValidar aguardando={aguardando} />
                    <p className="text-center mt-2">
                        <Link to={`${publicURL}/criar-conta`} className='remove-sublinhado'>Cadastrar</Link>
                        {' - '}
                        <Link to={`${publicURL}/recuperar-senha`} className='remove-sublinhado'>Esqueceu a senha?</Link>
                    </p>
                </Form>
            </div>
        </div>
    );
}

export default Login;