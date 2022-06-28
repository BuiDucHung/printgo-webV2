import React, {useState} from 'react'
import { Button, Checkbox, Col, Form, Input, Row, Typography } from 'antd';
import {FacebookOutlined, GoogleOutlined } from '@ant-design/icons';
import {useForm, Controller} from 'react-hook-form';

import styles from 'styles/ModalLogin.module.css';
import Link from 'next/link';
import RequestUtils from 'libs/RequestUtils';
import { change, setTokenAxios } from 'methods/user';


const { Title } = Typography;
export const Dangnhap = ({setVisible}) => {
  const { handleSubmit, control} = useForm();
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (value) => {
    try {
     const data = await RequestUtils.postCdp('/auth/login',value);
      change(data);
      setTokenAxios(data.token);
      if(data) setVisible(false); 
      
    } catch (error) {
      setErrorMessage(error);
    }
  }

  return (
    <div>
        <Title level={3}>Đăng nhập</Title>
        <Form name="basic" onFinish={handleSubmit(onSubmit)}>
            <Controller
              control={control}
              name="username"
              rules={{required: false}}
              render={({field}) => (
                <Form.Item {...field} rules={[{ required: true, message: 'Email không được để trống.' }]}>
                <Input className={styles.inputAuth} placeholder='Email'/>
                </Form.Item>
    
              )}
            />

            <Controller
              control={control}
              name="password"
              rules={{required: false}}
              render={({field}) => (
                <Form.Item {...field} rules={[{ required: true, message: 'Mật khẩu không được để trống.' }]}>
                <Input.Password className={styles.inputAuth} placeholder='Mật khẩu'/>
                </Form.Item>
              )}
            />
            {errorMessage && <p style={{color: '#ff4d4f'}}>Tài khoản hoặc mật khẩu không chính xác</p>}
            <Row style={{marginTop: 15}}>
            <Col span={8}>
                <Checkbox> Nhớ tài khoản</Checkbox>
            </Col>
            <Col span={8} offset={8}>
               <Link href={'/'}><p style={{cursor: 'pointer', textAlign: 'end', color: '#2dbeb3', fontSize: 13}}>Quên mật khẩu</p></Link>
            </Col>
            </Row>

            <Form.Item >
            <Button type="primary" className={styles.btnLogin} htmlType="submit">Đăng nhập</Button>
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
