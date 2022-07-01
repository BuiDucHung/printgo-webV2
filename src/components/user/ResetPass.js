import React, {useState} from 'react'
import { Button, Col, Form, Input, message, Row } from 'antd'
import RequestUtils from 'libs/RequestUtils';
import { useRouter } from 'next/router';

import styles from 'styles/customerUser.module.css'

export const ChangePass = () => {
    const [form] = Form.useForm();
    const router = useRouter();
    const [loadding, setLoadding] = useState(false);

    const submit = async(value) => {
    const url = new URL(window.location.href);
    const token = url.searchParams.get('token');
    try {
        if(token && value.pass){
            setLoadding(true);
            const sub = await RequestUtils.postCdpDirectResult('/auth/forgot-password', {token: token, pass:value.pass},null);
            if(sub){
            router.push('/login?redirect=/')
            }    
            message.success('Thay đổi mật khẩu thành công');    
     }
    } catch (error) {
        error && message.error('Lỗi thực hiện thao tác');
    }

  }
    
  return (
    <div>
        <Row style={{justifyContent: 'center'}}>
            <Col span={16}>
            <Form form={form} layout="vertical" onFinish={submit}> 
            <Form.Item name='pass' label="Nhập mật khẩu mới" rules={[{required: true, message: 'Bạn không được để trống mật khẩu '}]}>
                <Input.Password className={styles.InputItem} style={{marginBottom: 0, height: 35}} placeholder='Vui lòng nhập mật khẩu mới'/> 
            </Form.Item>
            <Button color='primary' disabled={loadding} loading={loadding} className={styles.Submit} style={{float: 'right', marginTop: 10}} htmlType="submit">Cập nhập</Button>
        </Form>
            </Col>
        </Row>
    </div>
  )
}
