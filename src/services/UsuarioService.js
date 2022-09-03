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