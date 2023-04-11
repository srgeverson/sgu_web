import axios from 'axios';
import { encode } from 'base-64';

const client_id = process.env.CLIENT_ID ? process.env.CLIENT_ID : 'api_node';
const client_secret = process.env.CLIENT_SECRET ? process.env.CLIENT_SECRET : '123456';
const port = process.env.SERVER_PORT ? process.env.SERVER_PORT : 8181;
const url = process.env.SERVER_URL ? process.env.SERVER_URL : `https://mystore-app.ddns.net`;
const url_api = process.env.SERVER_URL ? process.env.SERVER_URL : `${url}:${port}/v1`;

const api = (token) => {
    return axios.create({
        baseURL: url_api,
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${JSON.parse(token)}`,
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

export { api, authorizationServerLogin, authorizationServerRecuperarSenha };