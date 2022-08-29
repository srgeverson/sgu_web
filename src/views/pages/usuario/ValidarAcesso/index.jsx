import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Input, InputGroup, InputGroupText } from 'reactstrap';
import logo_sistema from '../../../../assets/images/logo_sistema.png';
import AlertaErro from '../../../components/AlertaErro';
import AlertaAtencao from '../../../components/AlertaAtencao';
import AlertaSucesso from '../../../components/AlertaSucesso';
import BotaoLogin from '../../../components/BotaoLogin';

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [senhaConfirma, setSenhaConfirma] = useState("");
    const [atencao, setAtencao] = useState("");
    const [sucesso, setSucesso] = useState("");
    const [erro, setErro] = useState("");
    const [aguardando, setAguardando] = useState(false);

    //Ao renderizar componente
    useEffect(() => {
        const { location } = props;

        if (location && location.state) {
            setSucesso(location.state.sucesso);
            setAtencao(location.state.atencao);
        }
        // eslint-disable-next-line
    }, []);

    const login = (e) => {
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
        if (!email) return setAtencao({ mensagem: "Preencha o campo e-mail!" });
        if (!senha) return setAtencao({ mensagem: "Preencha o campo senha!" });
        return true;
    }

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
                    <FormGroup>
                        <InputGroup>
                            <InputGroupText style={{ height: 46 }}>Senha</InputGroupText>
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
                        <Link to='/sgu_web/' className='remove-sublinhado'>Login</Link>
                    </p>
                </Form>
            </div>
        </div>
    );
}

export default Login;