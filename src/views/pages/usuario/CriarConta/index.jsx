import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Input, InputGroup, InputGroupText } from 'reactstrap';
import logo_sistema from '../../../../assets/images/logo_sistema.png';
import AlertaErro from '../../../components/AlertaErro';
import AlertaAtencao from '../../../components/AlertaAtencao';
import AlertaSucesso from '../../../components/AlertaSucesso';
import BotaoConfirmar from '../../../components/BotaoConfirmar';

const CriarConta = (props) => {
    const [id, setId] = useState("");
    const [senha, setSenha] = useState("");
    const [recuperarSenha, setRecuperarSenha] = useState("");
    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState("");
    const [atencao, setAtencao] = useState("");
    const [aguardando, setAguardando] = useState(false);
    const [recuperarSenhaInvalida, setRecuperarSenhaInvalida] = useState(false);
    const [formularioSucesso, setFormularioSucesso] = useState(false);

    const criticas = () => {
        if (!senha) return setAtencao({ mensagem: "Preencha o campo senha!" });
        if (senha.length < 6) return setAtencao({ mensagem: "A senha precisa ter pelo menos seis caracteres!" });
        return true;
    }

    const atualizarSenha = (e) => {
        e.preventDefault();
        if (!criticas()) return;
        setAguardando(true);
        props.alterarSenha({ id, recuperarSenha, senha }, (retorno) => {
            if (retorno.erro.erro) {
                setSucesso("");
                setErro({ mensagem: retorno.erro.mensagem });
            } else {
                setErro("");
                setSucesso({ mensagem: "Senha alterada com sucesso!" });
                setFormularioSucesso(true);
            }
        });
    }

    //Ao renderizar o componente
    useEffect(() => {
        setAguardando(true);
        if (props.match)
            props.validacaoRecuperarSenha(props.match.params.recuperarSenha, (retorno) => {
                if (retorno.erro.erro) {
                    setAtencao({ mensagem: 'Senha provisória inválida, solicite novo link para atualizar senha!' })
                    setRecuperarSenha(true);
                    setRecuperarSenhaInvalida(true);
                    setAguardando(false);
                } else {
                    setId(retorno.erro.usuario._id);
                    setRecuperarSenha(props.match.params.recuperarSenha);
                    setAguardando(false);
                }
            })
        // eslint-disable-next-line
    }, [])

    if (recuperarSenhaInvalida)
        return <Navigate to='/' state={atencao} replace />

    if (formularioSucesso)
        return <Navigate to='/' state={sucesso} replace />

    return (
        <div className="container-login">
            <div className="login card shadow">
                <Form onSubmit={atualizarSenha} className="form-signin text-center">
                    <img className="mb-4" src={logo_sistema} alt="Celke" width="72" height="72" />
                    <h1 className="h3 mb-3 font-weight-normal">Alterar Senha</h1>
                    <AlertaErro erro={erro} />
                    <AlertaAtencao atencao={atencao} />
                    <AlertaSucesso sucesso={sucesso} />
                    <Input
                        type="hidden"
                        value={id}
                        name="id"
                        id="id" />
                    <Input
                        type="hidden"
                        value={recuperarSenha}
                        name="recuperarSenha"
                        id="recuperarSenha" />
                    <FormGroup>
                        <InputGroup>
                            <InputGroupText style={{ height: 46 }}>Senha</InputGroupText>
                            <Input
                                type="password"
                                value={senha}
                                name="senha"
                                id="senha"
                                placeholder="Digite a nova senha do usuário"
                                onChange={(ev) => setSenha(ev.target.value)} required />
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