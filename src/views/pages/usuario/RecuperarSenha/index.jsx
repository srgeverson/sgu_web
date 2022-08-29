import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Form, InputGroup, InputGroupText, FormGroup, Input } from 'reactstrap';
import logo_sistema from '../../../../assets/images/logo_sistema.png';
import BotaoEnviar from '../../../components/BotaoEnviar';
import AlertaAtencao from '../../../components/AlertaAtencao';
import AlertaErro from '../../../components/AlertaErro';

const RecuperarSenha = (props) => {
    const [email, setEmail] = useState("");
    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState("");
    const [atencao, setAtencao] = useState("");
    const [aguardando, setAguardando] = useState(false);
    const [formularioPronto, setFormularioPronto] = useState(false);

    const criticas = () => {
        if (!email) return setAtencao({ mensagem: "Preencha o campo e-mail!" });
        return true;
    }

    const recuperaSenha = (e) => {
        e.preventDefault();
        if (!criticas()) return;
        setAguardando(true);
        props.recuperarSenha({ email }, (retorno) => {
            if (retorno.erro.erro) {
                setAtencao("");
                setSucesso("");
                setErro({ mensagem: retorno.erro.mensagem });
                setAguardando(false);
            } else {
                setAtencao("");
                setErro("");
                setSucesso({ mensagem: retorno.erro.mensagem });
                setFormularioPronto(true);
                setAguardando(false);
            }
        })
    }

    if (formularioPronto) 
        return <Navigate to='/' state={sucesso} replace/>

    return (
        <div className="container-login">
            <div className="login card shadow">
                <Form onSubmit={recuperaSenha} className="form-signin text-center">
                    <img className="mb-4" src={logo_sistema} alt="SAC" width="72" height="72" />
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
                        <Link to='/sgu_web/'>Login</Link>
                    </p>
                </Form>
            </div>
        </div>
    );
}

export default RecuperarSenha;