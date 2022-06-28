export const gateway = 'https://web-api.printgo.vn'
export const domain = 'https://printgo.vn';
export const media = domain + '/uploads';
export const cdp = 'http://61.28.235.166:8060';
export const URL_CDP = cdp;
export const price = cdp + '/rt-price';
export default {
    env: process.env.NODE_ENV,
    mode: process.env.MODE,
    gateway: gateway
}
