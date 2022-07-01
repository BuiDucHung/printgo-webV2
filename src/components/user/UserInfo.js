import { Button, Col, Form, Image, Input, message, Row ,Typography, Upload } from 'antd'
import React, {useState, useEffect} from 'react'
import styles from 'styles/customerUser.module.css'
import {PlusSquareOutlined, MessageOutlined, StarOutlined} from '@ant-design/icons'
import notify from 'styles/sidebar.module.css'
import { useStore } from 'StoreContext'
import { UseMout } from 'customerHook/UseMount'
import RequestUtils from 'libs/RequestUtils'

const { Title } = Typography;
const UserInfo = () => {
  const [form] = Form.useForm();
  const {state: {user}} = useStore();
  
  const [isSSR, setIsSSR] = useState(true);
  const [image, setImage] = useState(null);
  const [nameImg, setNameImg] = useState('');
  const onImageChange = (event) => {
    setNameImg(event.fileList[0]?.name)
      if (event.fileList && event.fileList[0]?.originFileObj) {
        setImage(URL.createObjectURL(event.fileList[0]?.originFileObj));
      }
  }

  const onSubmit = async(value) => {
     try {
      const data = await RequestUtils.postCdp('/customer/update', value, {id: user?.id});
      data && message.success('Cập nhập thành công');
     } catch (error) {
       error && message.error('Cập nhập thất bại');
     }
  }  

   UseMout(() => {
    setIsSSR(false);
   })

   useEffect( () => {
    form.setFieldsValue(user);
  }, [user]);
  
  return (
    <div>
      <Form form={form} onFinish={onSubmit}>
        <Row>
        <Col span={17}>
            <div className={styles.infoImage}>
              <div className={styles.img_avt}><Image src={image} width={85} height={85}/></div>
              {
                !isSSR && (
                  <div>
                    <h4 className={notify.userTitle} style={{fontSize: 15}}>{user?.username}</h4>
                  </div>
                )
              }
                <Upload onChange={onImageChange} >
                <Button  icon={<PlusSquareOutlined />} className={styles.upLoad}>CẬP NHẬP ẢNH ĐẠI DIỆN</Button>
               </Upload>
            </div>
        </Col>
        <Col span={7}>
          <div className={styles.borderRight}>
            <p style={{marginBottom: 5}}><MessageOutlined style={{color:'#2dbeb3', fontSize: 17}}/> Bạn chưa có bình luận</p>
            <p style={{marginBottom: 5}}><StarOutlined style={{color: '#ffdb4a', fontSize: 17}}/> Bạn chưa có đánh giá</p>
          </div>
        </Col>
      </Row>
      <div className={styles.formUser}>
        <Title level={3} style={{fontSize: 17, fontWeight: 700, margin: '12px 7px'}}>Thông tin người dùng</Title>
        <hr/>
        <Col span={24}>
              <label><b>Họ tên</b></label>
              <Form.Item name={'fullname'} rules={[{required: true, message: 'Họ Tên không được để trống'}]}>
              <Input className={styles.InputItem} style={{height: 35, marginBottom: 0}} size='100'/>
              </Form.Item>
          </Col>
        <Row gutter={[16, 16]}>
          <Col span={12}>
              <label><b>Số điện thoại</b></label>
              <Form.Item name={'phone'} rules={[{required: true, message: 'Điện thoại không được để trống'}]}>
              <Input className={styles.InputItem} style={{height: 35, marginBottom: 0}} size='100'/>
              </Form.Item>

          </Col>
          <Col span={12}>
          <label><b>Email</b></label>
           <Form.Item name={'email'} rules={[{required: true, message: 'Điện thoại không được để trống'}]}>
              <Input className={styles.InputItem} style={{height: 35, marginBottom: 0}} size='100'/>
           </Form.Item>
          </Col>
        </Row>
          <Button type='submit' className={styles.Submit} style={{marginTop: 15}} htmlType="submit">CẬP NHẬP</Button>
      </div>
      </Form>
    </div>
  )
}

export default UserInfo