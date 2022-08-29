import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Input, InputGroup, InputGroupText } from 'reactstrap';
import logo_sistema from '../../../../assets/images/logo_sistema.png';
import AlertaErro from '../../../components/AlertaErro';
import AlertaAtencao from '../../../components/AlertaAtencao';
import AlertaSucesso from '../../../components/AlertaSucesso';
import BotaoConfirmar from '../../../components/BotaoConfirmar';
import { recuperarSenha } from '../../../../services/usuario'
//Teste
import { authorizationServerRecuperarSenha } from '../../../../core/api';

const CriarConta = (props) => {
    const [nome, setNome] = useState(null);
    const [email, setEmail] = useState(null);
    const [erro, setErro] = useState(null);
    const [sucesso, setSucesso] = useState(null);
    const [atencao, setAtencao] = useState(null);
    const [aguardando, setAguardando] = useState(false);
    const [formularioSucesso, setFormularioSucesso] = useState(false);

    const criticas = () => {
        if (!nome) return setAtencao({ mensagem: "Preencha o campo nome!" });
        if (!email) return setAtencao({ mensagem: "Preencha o campo e-mail!" });
        return true;
    }

    const cadastrarSemSenha = async (e) => {
        e.preventDefault();
        if (!criticas()) return;
        setAguardando(true);
        const dados = { nome, email };
        await recuperarSenha(dados, (callback) => {
            console.log(callback);
            if (callback.erro.erro) {
                setSucesso("");
                setErro({ mensagem: callback.erro.mensagem });
            } else {
                setErro("");
                setSucesso({ mensagem: "Cadastro realizado com sucesso, você receberá um email com código de acesso para criar asenha!" });
                setFormularioSucesso(true);
            }
        });
        //Teste
        authorizationServerRecuperarSenha()
            .post('/usuarios/sem-senha', dados)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));

        setAguardando(false);
    }

    //Ao renderizar o componente
    useEffect(() => {
        setAguardando(true);
        if (props.params)
            setEmail(props.params.email);
        setAguardando(false);
        // eslint-disable-next-line
    }, [])

    if (formularioSucesso)
        return <Navigate to='/sgu_web/validar-acesso' state={sucesso} replace />

    return (
        <div className="container-login">
            <div className="login card shadow">
                <Form onSubmit={cadastrarSemSenha} className="form-signin text-center">
                    <img className="mb-4" src={logo_sistema} alt="logo" width="72" height="72" />
                    <h1 className="h3 mb-3 font-weight-normal">Cadastre-se</h1>
                    <AlertaErro erro={erro} />
                    <AlertaAtencao atencao={atencao} />
                    <AlertaSucesso sucesso={sucesso} />
                    <FormGroup>
                        <InputGroup>
                            <InputGroupText style={{ height: 46 }}>Nome/Apelido</InputGroupText>
                            <Input
                                type="text"
                                value={nome}
                                name="nome"
                                id="nome"
                                placeholder="Digite nome/apelido"
                                onChange={(ev) => setNome(ev.target.value)} required />
                        </InputGroup>
                    </FormGroup>
                    <FormGroup>
                        <InputGroup>
                            <InputGroupText style={{ height: 46 }}>Em-mail</InputGroupText>
                            <Input
                                type="email"
                                value={email}
                                name="email"
                                id="email"
                                placeholder="Digite o e-mail"
                                onChange={(ev) => setEmail(ev.target.value)} required />
                        </InputGroup>
                    </FormGroup>
                    <BotaoConfirmar aguardando={aguardando} />
                    <p className="text-center mt-2">
                        <Link to='/sgu_web/' className='remove-sublinhado'>Login</Link>
                    </p>
                </Form>
            </div>
        </div>
    );
}

export default CriarConta;