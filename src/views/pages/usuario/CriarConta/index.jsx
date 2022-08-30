import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Input, InputGroup, InputGroupText } from 'reactstrap';
import logo_sistema from '../../../../assets/images/logo_sistema.png';
import AlertaErro from '../../../components/AlertaErro';
import AlertaAtencao from '../../../components/AlertaAtencao';
import AlertaSucesso from '../../../components/AlertaSucesso';
import BotaoConfirmar from '../../../components/BotaoConfirmar';
import { authorizationServerRecuperarSenha } from '../../../../core/api';

const CriarConta = (props) => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [erro, setErro] = useState('');
    const [sucesso, setSucesso] = useState('');
    const [atencao, setAtencao] = useState('');
    const [aguardando, setAguardando] = useState(false);
    const [formularioSucesso, setFormularioSucesso] = useState(false);

    const criticas = () => {
        if (!nome) return setAtencao({ mensagem: "Preencha o campo nome!" });
        if (!email) return setAtencao({ mensagem: "Preencha o campo e-mail!" });
        return true;
    }

    const cadastrarSemSenha = async (e) => {
        e.preventDefault();

        if (!criticas())
            return;

        const dados = { nome, email };

        setAguardando(true);

        await authorizationServerRecuperarSenha()
            .post('/usuarios/sem-senha', dados)
            .then((response) => {
                setErro('');
                setAtencao('');
                if(response.data)
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

        setAguardando(false);
    }

    useEffect(() => {
        setAguardando(true);
        if (props.params)
            setEmail(props.params.email);
        setAguardando(false);
        // eslint-disable-next-line
    }, [])

    if (formularioSucesso) {
        console.log(sucesso)
        return <Navigate to='/sgu_web/validar-acesso' state={sucesso} replace />
    }

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