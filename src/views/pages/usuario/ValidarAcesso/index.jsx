import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Input, InputGroup, InputGroupText } from 'reactstrap';
import logo_sistema from '../../../../assets/images/logo_sistema.png';
import AlertaErro from '../../../components/AlertaErro';
import AlertaAtencao from '../../../components/AlertaAtencao';
import AlertaSucesso from '../../../components/AlertaSucesso';
import BotaoLogin from '../../../components/BotaoLogin';

const Login = (props) => {
    const [codigo, setCodigo] = useState(null);
    const [email, setEmail] = useState(null);
    const [senha, setSenha] = useState(null);
    const [senhaConfirma, setSenhaConfirma] = useState(null);
    const [atencao, setAtencao] = useState(null);
    const [sucesso, setSucesso] = useState(null);
    const [erro, setErro] = useState(null);
    const [aguardando, setAguardando] = useState(false);

    //Ao renderizar componente
    useEffect(() => {
        const { location } = props;

        if (location && location.state) {
            setEmail(location.state.email)
            setSucesso(location.state.sucesso);
            setAtencao(location.state.atencao);
        }
        // eslint-disable-next-line
    }, []);

    const validarAcessoo = (e) => {
        e.preventDefault();
        setErro("");
        setAtencao("");
        if (!criticas()) return;
        setAguardando(true);
        props.handleLogin({ email, senha }, (retorno) => {
            if (retorno.erro) {
                setErro({ mensagem: retorno.erro.mensagem });
                setAguardando(false);
            } else {
                setErro("");
                setAguardando(false);
            }
        });
    }

    const criticas = () => {
        if (!codigo) return setAtencao({ mensagem: "Preencha o campo código!" });
        if (!email) return setAtencao({ mensagem: "Preencha o campo e-mail!" });
        if (!senha) return setAtencao({ mensagem: "Preencha o campo senha!" });
        if (!senhaConfirma) return setAtencao({ mensagem: "Preencha o campo confirma senha!" });
        if (senha !== senhaConfirma) return setAtencao({ mensagem: "As senhas não são iguais!" });
        return true;
    }

    return (
        <div className="container-login">
            <div className="login card shadow">
                <Form onSubmit={validarAcessoo} className="form-signin text-center">
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