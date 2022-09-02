import { api } from '../core/api';
import errorHandler from '../core/handler/exception';

class PermissaoService {

    constructor() {
        this.token = localStorage.getItem('token');
    }

    async ativar(id) {
        return await api(this.token)
            .put(`/permissoes/ativa/${id}`)
            .then((callbackSuccess) => {
                return callbackSuccess.data;
            })
            .catch((callbackError) => {
               return errorHandler(callbackError.response);
            });
    }

    async desativar(id) {
        return await api(this.token)
            .put(`/permissoes/desativa/${id}`)
            .then((callbackSuccess) => {
                return callbackSuccess.data;
            })
            .catch((callbackError) => {
               return errorHandler(callbackError.response);
            });
    }

    async listarTodas() {
        return await api(this.token)
            .get(`/permissoes`)
            .then((callbackSuccess) => {
                return callbackSuccess.data;
            })
            .catch((callbackError) => {
               return errorHandler(callbackError.response);
            });
    }
}

export default PermissaoService;