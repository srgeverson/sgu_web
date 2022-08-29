import axios from 'axios';
import { encode } from 'base-64';
// import {config} from 'dotenv';

// const client_id = process.env.CLIENT_ID;
// const client_secret = process.env.CLIENT_SECRET;
// const url_api = `${process.env.SERVER_URL}:${process.env.SERVER_PORT}/v1`;

const client_id = 'api_node';
const client_secret = '123321';
const url_api = `http://localhost:8080/v1`;

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
    console.log(url_api);
    return axios.create({
        baseURL: url_api,
        headers: {
            'Authorization': `Basic ${encode(`${client_id}:${client_secret}`)}`,
            'Content-Type': 'application/json'
        },
    });
}

export { authorizationServerLogin, authorizationServerRecuperarSenha, api };