import { api } from '../core/api';
import errorHandler from '../core/handler/exception';

class UsuarioService {

    constructor() {
        this.token = localStorage.getItem('token');
    }

    async ativar(id) {
        return await api(this.token)
            .put(`/usuarios/ativa/${id}`)
            .then((callbackSuccess) => {
                return callbackSuccess.data;
            })
            .catch((callbackError) => {
               return errorHandler(callbackError.response);
            });
    }
    
    async alterar(id, dados) {
        return await api(this.token)
            .put(`/usuarios/id/${id}`, dados)
            .then((callbackSuccess) => {
                return callbackSuccess.data;
            })
            .catch((callbackError) => {
               return errorHandler(callbackError.response);
            });
    }

    async buscarPorId(id) {
        return await api(this.token)
            .get(`/usuarios/${id}`)
            .then((callbackSuccess) => {
                return callbackSuccess.data;
            })
            .catch((callbackError) => {
               return errorHandler(callbackError.response);
            });
    }

    async cadastrar(dados) {
        return await api(this.token)
            .post(`/usuarios/com-senha`, dados)
            .then((callbackSuccess) => {
                return callbackSuccess.data;
            })
            .catch((callbackError) => {
               return errorHandler(callbackError.response);
            });
    }

    async desativar(id) {
        return await api(this.token)
            .put(`/usuarios/desativa/${id}`)
            .then((callbackSuccess) => {
                return callbackSuccess.data;
            })
            .catch((callbackError) => {
               return errorHandler(callbackError.response);
            });
    }

    async listarTodas() {
        return await api(this.token)
            .get(`/usuarios`)
            .then((callbackSuccess) => {
                return callbackSuccess.data;
            })
            .catch((callbackError) => {
               return errorHandler(callbackError.response);
            });
    }
}

export default UsuarioService;