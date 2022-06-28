import { Button, Col, Form, Input, Row } from 'antd'
import React from 'react'

export const ChangePass = () => {
  return (
    <div>
        <Row style={{justifyContent: 'center'}}>
            <Col span={16}>
            <Form>
            <Form.Item>
                <Input placeholder='Mật khẩu cũ'/> 
            </Form.Item>
            <Form.Item>
                <Input placeholder='Mật khẩu mới'/> 
            </Form.Item>
            <Form.Item>
                <Input placeholder='Nhập lại mật khẩu'/> 
            </Form.Item>
            <Button color='primary' style={{float: 'right'}}>Cập nhập</Button>
        </Form>
            </Col>
        </Row>
    </div>
  )
}
