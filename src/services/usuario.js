import { authorizationServerRecuperarSenha } from '../core/api';

export const recuperarSenha = (usuario, callback) => {
    console.log(usuario);
    return async () => {
        await authorizationServerRecuperarSenha()
            .post(
                '/usuarios/sem-senha',
                usuario
            )
            .then((response) => {
                console.log(response);
                callback(response.data);
                // api(response.data.access_token)
                //     .get(`/v1/usuarios/${dadosUsuario.email}/codigo-acesso`)
                //     .then((response) => {
                //         callback(response.data);
                //     })
                //     .catch(
                //         (error) => callback(erro(error))
                //     );
            })
            .catch((callbackError) => {
                //callback(erro(callbackError));
                console.log(callbackError);
            });
    }
}

export const removerUsuario = async () => {
    return;
}