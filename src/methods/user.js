import { message } from 'antd';
import axios from 'axios';
import RequestUtils from 'libs/RequestUtils';

import { getValueLocal, parse, removeValueLocal, setValueLocal } from '../utils/index';
import { putToStore } from './changeStore';

export const setTokenAxios = tk => axios.defaults.headers.common['Authorization'] = 'Bearer ' + tk
export const initUser = () => {
    const user = getValueLocal('user');
    const u = parse(user);
    if(u?.token){
        setTokenAxios(u.token);
    }
    return u;
}

  export function LogOut() {
    removeValueLocal('user');
    putToStore({type: 'removeUser', data: null});
    delete axios.defaults.headers.common['Authorization'];
  }

  export const change = (u) => {
      setValueLocal('user', JSON.stringify(u));
      putToStore({type: 'adduser', data: u});
  }

  export const changePayment = (ev) => {
    setValueLocal('payment', JSON.stringify(ev));
}


  export const updateStore = async(values) => {
    const req = await RequestUtils.postCdp('/customer/update', values, null);
    if(req) {
      changePayment(req);
      message.success('Cập nhập thành công');
    }else{
      message.error('Cập nhập thất bại')
    }
  }
