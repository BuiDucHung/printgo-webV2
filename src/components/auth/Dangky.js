import React, {useState} from 'react';
import { Button, Form, Input, Typography } from 'antd';

import styles from 'styles/ModalLogin.module.scss';
import RequestUtils from 'libs/RequestUtils';
import { change, setTokenAxios } from 'methods/user';
import { parse } from '../../utils/index';
import { useRouter } from 'next/router';


const ERROR_EMAIL = 'Email đã tồn tại';
const ERROR_PASS = 'Số điện thoại đã tồn tại';
const { Title } = Typography;

const Dangky = ({setVisible}) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (value) => {
    try {
      const values = await RequestUtils.postCdpDirectResult('/auth/register',value);
      const { errorCode, data } = values;
      if(errorCode === 200) {
        change(data);
        setTokenAxios(values.token);
        if(values) setVisible(false); 
        return router.push('/customer');
      } 
    } catch (err) {
      const error = parse(err.request?.response); 
      setErrorMessage(error.message);
    }
  }

  return (
    <div>
        <Title level={3}>Đăng ký</Title>
        <Form form={form} initialValues={{ remember: true }} onFinish={onSubmit}>
            <Form.Item name={'email'} rules={[{ required: true, message: 'Email không được để trống.' }]}>
              <Input className={styles.inputAuth} placeholder='Email'/>
            </Form.Item>
            {errorMessage === ERROR_EMAIL && <p style={{color: '#ff4d4f'}}>{errorMessage}</p>}

            <Form.Item name={'phone'} rules={[{ required: true, message: 'Điện thoại không được để trống.' }]}>
              <Input className={styles.inputAuth} placeholder='Điện thoại'/>
            </Form.Item>
             {errorMessage === ERROR_PASS && <p style={{color: '#ff4d4f'}}>{errorMessage}</p>}
            
            <Form.Item name={'pass'} rules={[{ required: true, message: 'Mật khẩu không được để trống.' }]}>
              <Input.Password className={styles.inputAuth} placeholder='Mật khẩu'/>
            </Form.Item> 
    
            <Form.Item name={'passAgain'} rules={[{ required: true, message: 'Xác nhận mật khẩu không được để trống' },
            ({getFieldValue}) => ({
              validator(_, value){
                if(!value || getFieldValue('pass') === value){
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Hai mật khẩu đã nhập không khớp'));
              }
            })
            ]}>
            <Input.Password className={styles.inputAuth} placeholder='Nhập lại mật khẩu'/>
            </Form.Item>
            <div>
            <p>Mật khẩu phải có ít nhất 6 ký tự, bao gồm cả chữ và số</p>
            </div>
            <Form.Item >
            <Button type="primary" className={styles.btnLogin} htmlType="submit">
               Đăng ký miễn phí
            </Button>
            </Form.Item>
        </Form>
    </div>
  )
}

export default Dangky