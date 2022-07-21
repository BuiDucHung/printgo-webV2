import React from 'react'
import { Button, Col, Form, Input, message, Row } from 'antd'

import styles from 'styles/customerUser.module.scss'
import RequestUtils from 'libs/RequestUtils';


const ChangePass = () => {
    const [form] = Form.useForm();

    const submit = async (value) => {
    
        try {
           const data = await RequestUtils.postCdp('/auth/update-password', value);
            if(data) {
                return message.success('Thay đổi mật khẩu thành công');
            }     
        } catch (error) {
            error && message.error('Thay đổi mật khẩu không thành công');
        }
    }

  return (
    <div>
        <Row style={{justifyContent: 'center'}}>
            <Col span={16}>
            <Form form={form} layout="vertical" onFinish={submit}>
            <Form.Item name='pass' label="Mật khẩu mới" required rules={[{required: true, message: 'Bạn không được để trống mật khẩu'}]}>
                <Input.Password className={styles.InputItem} style={{marginBottom: 0, height: 35}} placeholder='Vui lòng nhập mật khẩu mới'/> 
            </Form.Item>
            <Form.Item name='emailOrPhone' label="Email hoặc số điện thoại" rules={[{required: true, message: 'Bạn không được để trống email hoặc số điện thoại'}]}>
                <Input className={styles.InputItem} style={{marginBottom: 0, height: 35}} placeholder='Vui lòng nhập email hoặc số điện thoại'/> 
            </Form.Item>
            <Button color='primary' className={styles.Submit} style={{float: 'right', marginTop: 10}} htmlType="submit">Cập nhập</Button>
        </Form>
            </Col>
        </Row>
    </div>
  )
}

export default ChangePass