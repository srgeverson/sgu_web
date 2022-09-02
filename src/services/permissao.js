import { api } from '../core/api';

export const listarTodas = async () => {
    console.log('listarTodas');

    return new Promise((resolve, reject) => {
        api().get(`/permissoes`)
            .then((callbackSuccess) => {
                console.log('callbackSuccess');
                resolve();
            })
            .catch((callbackError) => {
                console.log(callbackError.response.data);
                return callbackError.response.data;
                //reject();
            });
    });
}