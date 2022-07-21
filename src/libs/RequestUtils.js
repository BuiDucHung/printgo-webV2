import {gateway, print, cdp, price} from '../config';
import axios from 'axios';

class RequestUtils {

    static encodeQueryData(data) {
        if(!data) {
            return '';
        }
        const ret = [];
        for (let d in data)
            ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
        return '?' + ret.join('&');
    }

    static httpRequest( input, service, method = 'GET', params = '') {
        const _uri = gateway + '/' + service;
        let getOrPost;
        if (method === 'GET') {
            getOrPost = axios.get(_uri + this.encodeQueryData(input));
        } else {
            getOrPost = axios.post(_uri + this.encodeQueryData(params), input);
        }
        return getOrPost.then(responseJson => {
            return responseJson.data;
        }).catch(error => {
            return { data: null, errorCode: 500, message: error.message }
        });
    }

    static async Get(service, input = null, defaultValue = {} ) {
        const ret = await this.httpRequest( input, service, 'GET' );
        return (ret?.errorCode) === 200 ? ret.data : defaultValue;
    }

    static async GetWeb(service, input = null, defaultValue = {} ) {
        const ret = await this.httpRequest( input, service, 'GET' );
        return ret?.status === 200 ? ret.result : defaultValue;
    }

    static async Post(service, input = '', params = '', defaultValue = {}) {
        const ret = await this.httpRequest( input, service, 'POST', params );
        return ret?.errorCode === 200 ? ret.data : defaultValue;
    }

    static getResultCdp (req, defaultValue) {
        return req.then( ({data : ret}) => (ret.errorCode === 200 ? ret.data : defaultValue)).catch( () => {
            return defaultValue;
        });
    }

    static async getCdp(service, input = null, defaultValue = {} ) {
        const _uri = cdp + '/web' + service;
        const req = axios.get(_uri + this.encodeQueryData(input));
        return this.getResultCdp(req, defaultValue);
    }

    static async postCdp(service, input = null, params = '', defaultValue = null ) {
        const _uri = cdp + '/web' + service;
        const req = axios.post(_uri + this.encodeQueryData(params), input);
        return this.getResultCdp(req, defaultValue);
    }

    static async postCdpdForm(service, input = null, params = '' , defaultValue = null) {
        const _uri = cdp + service;
        const req =  axios.post(_uri + this.encodeQueryData(params), input);
        return this.getResultCdp(req, defaultValue);
    }

    static async getCdpDirectResult(service, params = null) {
        const _uri = cdp + '/web' + service;
        const ret = await axios.get(_uri + this.encodeQueryData(params));
        return ret.data;
    }

    static async postCdpDirectResult(service, input = null, params = '') {
        const _uri = cdp + '/web' + service;
        const ret = await axios.post(_uri + this.encodeQueryData(params), input);
        return ret.data;
    }

    static openCdp(service, input = null, defaultValue = {} ) {
        const _uri = cdp + service;
        const req = axios.get(_uri + this.encodeQueryData(input));
        return this.getResultCdp(req, defaultValue);
    }

    static openPrice(service, input = null, defaultValue = {} ) {
        const _uri = price + service;
        const req = axios.get(_uri + this.encodeQueryData(input));
        return this.getResultCdp(req, defaultValue);
    }

    static postPrice(service, input = null, params = '', defaultValue = {} ) {
        const _uri = price + service;
        const req = axios.post(_uri + this.encodeQueryData(params), input);
        return this.getResultCdp(req, defaultValue);
    }
}

export default RequestUtils;
