import React, {useState} from 'react';
import { Button, Form, Input, Typography } from 'antd';
import {useForm, Controller} from 'react-hook-form';

import styles from 'styles/ModalLogin.module.css';
import RequestUtils from 'libs/RequestUtils';
import { change, setTokenAxios } from 'methods/user';
import { parse } from 'utils';
import { useRouter } from 'next/router';


const ERROR_EMAIL = 'Email đã tồn tại';
const ERROR_PASS = 'Số điện thoại đã tồn tại';
const { Title } = Typography;

const Dangky = () => {
  const router = useRouter();
  const { handleSubmit, control} = useForm();
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (value) => {
    try {
      const data = await RequestUtils.postCdpDirectResult('/auth/register',value);
      change(data);
      setTokenAxios(data.token);
      return router.push('/customer');
      
    } catch (err) {
      const error = parse(err.request?.response); 
      setErrorMessage(error.message);
    }
  }

  return (
    <div>
        <Title level={3}>Đăng ký</Title>
        <Form name="basic" initialValues={{ remember: true }} onFinish={handleSubmit(onSubmit)}>
            <Controller
             control={control}
             rules={{required: false}}
             name="email"
             render={({field}) => (
              <Form.Item {...field} rules={[{ required: true, message: 'Email không được để trống.' }]}>
              <Input className={styles.inputAuth} placeholder='Email'/>
              </Form.Item>
             )}
            />
              {errorMessage === ERROR_EMAIL && <p style={{color: '#ff4d4f'}}>{errorMessage}</p>}
            <Controller
            control={control}
            rules={{required: false}}
            name="phone"
            render={({field}) => (
              <Form.Item {...field} rules={[{ required: true, message: 'Điện thoại không được để trống.' }]}>
              <Input className={styles.inputAuth} placeholder='Điện thoại'/>
              </Form.Item>
              )}
            />
             {errorMessage === ERROR_PASS && <p style={{color: '#ff4d4f'}}>{errorMessage}</p>}
            <Controller
            control={control}
            rules={{required: false}}
            name="pass"
            render={({field}) => (
              <Form.Item {...field} rules={[{ required: true, message: 'Mật khẩu không được để trống.' }]}>
              <Input.Password className={styles.inputAuth} placeholder='Mật khẩu'/>
              </Form.Item>  
            )}
            />
            
            <Controller
            control={control}
            rules={{required: false}}
            name="passAgain"
            render={({field}) => (
            <Form.Item {...field} 
            rules={[{ required: true, message: 'Xác nhận mật khẩu không được để trống' },
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
            )}
            />
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