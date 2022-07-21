import React, {useState} from 'react'
import { Button, Checkbox, Col, Form, Input, message, Row, Typography } from 'antd';
import {FacebookOutlined, GoogleOutlined } from '@ant-design/icons';

import styles from 'styles/ModalLogin.module.scss';

import RequestUtils from 'libs/RequestUtils';
import { change, setTokenAxios } from 'methods/user';
import { checkErrorBefore } from 'components/user/User-utils';


const { Title } = Typography;
export const Dangnhap = ({setVisible}) => {
  const [form] = Form.useForm()
  const [errorMessage, setErrorMessage] = useState('');
  const [isForgot, setForgot] = useState(false);
  const onSubmit = async (value) => {
    try {
        if(isForgot){
          if(value.username && !checkErrorBefore(value.username)){
            const res = await RequestUtils.getCdp('/auth/url-token-forgot-pass', {email: value.username}, null);
            if(res){
              return message.success('Vui lòng check mail để lấy lại mật khẩu', 2)
            }else{
              return message.error('Lỗi lấy lại mật khẩu, vui lòng thử lại sau', 2)
            }
          }else{
            return message.warning('Vui lòng kiểm tra địa chỉ email', 2);
          }
        }else {
          const data = await RequestUtils.postCdp('/auth/login',value);
          change(data);
          setTokenAxios(data.token);
          if(data) setVisible(false); 
        } 
    } catch (error) {
      setErrorMessage(error);
    }
  }

  return (
    <div>
        <Title level={3}>{isForgot ? 'Quên mật khẩu' : 'Đăng nhập'}</Title>
        <Form form={form} onFinish={onSubmit}>
            {
              !!isForgot ? (
                <Form.Item name={'username'} rules={[{ required: true, message: 'Email không được để trống.' }]}>
                    <Input className={styles.inputAuth} placeholder='Email'/>
                  </Form.Item>
              ) : (
                <>
                  <Form.Item name={'username'} rules={[{ required: true, message: 'Email không được để trống.' }]}>
                    <Input className={styles.inputAuth} placeholder='Email'/>
                  </Form.Item>

                  <Form.Item name={'password'} rules={[{ required: true, message: 'Mật khẩu không được để trống.' }]}>
                      <Input.Password className={styles.inputAuth} placeholder='Mật khẩu'/>
                  </Form.Item>
                  {errorMessage && <p style={{color: '#ff4d4f'}}>Tài khoản hoặc mật khẩu không chính xác</p>}
                </>
              )
            }
            <Row style={{marginTop: 15}}>
            <Col span={8}>
              <Checkbox> Nhớ tài khoản</Checkbox>
            </Col>
            <Col span={8} offset={8}>
               <p style={{cursor: 'pointer', textAlign: 'end', color: '#2dbeb3', fontSize: 13}} onClick={() => setForgot(pre => !pre)}>{!isForgot ? 'Quên mật khẩu' : 'Đăng nhập'}</p>
            </Col>
            </Row>

            <Form.Item >
            <Button type="primary" className={styles.btnLogin} htmlType="submit">{!!isForgot ? 'Lấy lại mật khẩu' : 'Đăng nhập'}</Button>
            </Form.Item>
            <div style={{width: 284, margin: 'auto'}}>
            <p style={{textAlign: 'center'}}>Hoặc đăng nhập với</p>
            <div style={{display: 'flex', justifyContent:'center' , gap:6, margin: 'auto'}}>
                <Button type="primary" style={{background: '#1253ab', border: 'none', width: 136, height: 39, borderRadius: 50}}><FacebookOutlined /></Button>
                <Button type="primary" style={{background: '#ea585a',border: 'none' , width: 136, height: 39, borderRadius: 50}}><GoogleOutlined /></Button>
            </div>
            </div>
        </Form>
    </div>
  )
}
