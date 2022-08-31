import axios from 'axios';
import { encode } from 'base-64';

const client_id = 'api_node';
const client_secret = '123321';
const url_api = `http://localhost:8181/v1`;

const api = (token) => {
    return axios.create({
        baseURL: url_api,
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    });
}

const authorizationServerLogin = () => {
    return axios.create({
        baseURL: url_api,
        headers: {
            'Accept': 'application/json',
            'Authorization': `Basic ${encode(`${client_id}:${client_secret}`)}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    });
}

const authorizationServerRecuperarSenha = () => {
    return axios.create({
        baseURL: url_api,
        headers: {
            'Authorization': `Basic ${encode(`${client_id}:${client_secret}`)}`,
            'Content-Type': 'application/json'
        },
    });
}

export { authorizationServerLogin, authorizationServerRecuperarSenha, api };