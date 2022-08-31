import React, { useEffect, useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { Form, FormGroup, Input, InputGroup, InputGroupText } from 'reactstrap';
import logo_sistema from '../../../../assets/images/logo_sistema.png';
import AlertaErro from '../../../components/AlertaErro';
import AlertaAtencao from '../../../components/AlertaAtencao';
import AlertaSucesso from '../../../components/AlertaSucesso';
import BotaoLogin from '../../../components/BotaoLogin';
import { authorizationServerLogin } from '../../../../core/api';

const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [atencao, setAtencao] = useState('');
    const [sucesso, setSucesso] = useState('');
    const [erro, setErro] = useState('');
    const [aguardando, setAguardando] = useState(false);
    const location = useLocation();
    const [formularioSucesso, setFormularioSucesso] = useState(false);

    useEffect(() => {
        if (location && location.state) {
            if (location.state.email)
                setEmail(location.state.email);
            if (location.state.erro === true)
                setErro({ mensagem: location.state.mensagem });
            else
                setSucesso({ mensagem: location.state.mensagem });
        }
        // eslint-disable-next-line
    }, []);

    const login = async (e) => {
        e.preventDefault();

        if (!criticas())
            return;

        setAguardando(true);

        await authorizationServerLogin()
            .post('/usuarios/token', `username=${email}&password=${senha}&grant_type=password`)
            .then((response) => {
                setErro('');
                setAtencao('');
                if (response.data) {
                    localStorage.setItem('token', JSON.stringify(response.data.access_token));
                    setSucesso({ mensagem: response.data.access_token });
                }
                setFormularioSucesso(true);
            })
            .catch((error) => {
                if (error.response.data) {
                    if (error.response.data.statusCode === 400 ||
                        error.response.data.statusCode === 401) {
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
        if (!email) return setAtencao({ mensagem: "Preencha o campo e-mail!" });
        if (!senha) return setAtencao({ mensagem: "Preencha o campo senha!" });
        return true;
    }
    if (formularioSucesso)
        return <Navigate to='/sgu_web/painel-de-controle' replace />

    return (
        <div className="container-login">
            <div className="login card shadow">
                <Form onSubmit={login} className="form-signin text-center">
                    <img className="mb-4" src={logo_sistema} alt="logo" width="72" height="72" />
                    <h1 className="h3 mb-3 font-weight-normal">Área Restrita</h1>
                    <AlertaErro erro={erro} />
                    <AlertaAtencao atencao={atencao} />
                    <AlertaSucesso sucesso={sucesso} />
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
                    <BotaoLogin aguardando={aguardando} />
                    <p className="text-center mt-2">
                        <Link to='/sgu_web/criar-conta' className='remove-sublinhado'>Cadastrar</Link>
                        {' - '}
                        <Link to='/sgu_web/recuperar-senha' className='remove-sublinhado'>Esqueceu a senha?</Link>
                    </p>
                </Form>
            </div>
        </div>
    );
}

export default Login;