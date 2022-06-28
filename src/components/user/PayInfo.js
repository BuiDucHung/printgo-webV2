import React, {useState} from 'react'
import { Button, Checkbox, Col, Form, Input, Radio, Row, Space, Table, Tabs, Tag, Typography } from 'antd';

import styles from 'styles/payInfo.module.css'
import btn from 'styles/customerUser.module.css'
import { PlusSquareOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useStore } from 'StoreContext';
import { update } from 'methods/user';
import { getService } from 'service/userService';

const { Title } = Typography;


const PayInfo = ({listAddress}) => {
    const { state: {user}} = useStore();
    const getData = listAddress.map((item) => ({key: item.id , name: item.receiverName, phone: item.mobilePhone, address: item.address}));
    const [currentPay, setCurrentPay] = useState(user?.payMethod || 'CK');

    const columns = [
      {
        title: 'Họ tên',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Số điện thoại',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: 'Địa chỉ',
        key: 'address',
        dataIndex: 'address',
      },
      {
        title: 'Thao tác',
        key: 'action',
        render: (_, record) => (
          <Space size="middle">
            <Link href={`/customer-address/${record.key}`}>Sửa</Link>
            <a>Xóa</a>
          </Space>
        ),
      },
    ];
    const onSubmit = () => {
       update({...user, payMethod: currentPay})
    };
    
    
  return (
    <div >
        <div className={styles.infoPay}>
            <Row justify='space-between' >
                <Col span={8}>
                <Title level={2} className={styles.title}>Thông tin giao hàng</Title>
                </Col>
                <Col span={8}>
                <div className={styles.adddress}>
                <Link href={'/customer-address/create'}><a><Button icon={<PlusSquareOutlined />} className={btn.upLoad}>THÊM ĐỊA CHỈ MỚI</Button></a></Link>
                </div>
                </Col>
            </Row>
            <hr/>
              <div>
              <Table pagination={false} dataSource={getData} columns={columns}/> 
              <p style={{paddingTop: 10,fontSize: 13, fontStyle: 'italic'}}><span style={{color: 'red', fontSize: 13, fontWeight: 500}}>
              <b>*Lưu ý:</b>
              </span> Địa chỉ được chọn phía trên (dòng sáng) sẽ là địa chỉ mặc định để giao hàng</p>
              </div>
        </div>
        <div className={styles.infoPay}>
            <Title level={2} className={styles.title}>Phương thức thanh toán</Title>
            <hr/>
            <div style={{paddingLeft: 20}}>
            <Radio.Group onChange={((e) => setCurrentPay(e.target.value))}>
            <Radio value="CK">Chuyển khoản</Radio>
            <Radio value="QR">Mã QR Code</Radio>
            </Radio.Group>
          </div>
          <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <Button htmlType="submit" onClick={onSubmit} className={btn.Submit} style={{marginBottom: 20}}>Cập nhập</Button>
            {/* <Tabs defaultActiveKey='1'>
              <TabPane tab="Thẻ ATM nội địa (Internet Banking)" key={'1'}>
              <div style={{paddingLeft: 20}}>
                <Title level={3} style={{fontSize: 15}}>Bạn cần có</Title> 
                <p style={{fontSize: 12}}>1. Thẻ ATM</p>
                <p style={{fontSize: 12}}>2. Đã đăng ký dịch vụ THANH TOÁN TRỰC TUYẾN và / hoặc NGÂN HÀNG ĐIỆN TỬ (Internet Banking)</p>
                <p style={{fontSize: 12}}>3. Số dư tài khoản PHẢI LỚN HƠN tổng giá trị đơn hàng</p>
              </div>
              <hr/>
              </TabPane>
              <TabPane tab="Thanh toán khi nhận hàng" key={'2'}>
                 <div style={{paddingLeft: 20}}>
                   <p style={{fontSize: 12}}>Bạn có thể thanh toán bằng tiền mặt khi nhận hàng tại nhà, Sau khi đặt hàng thành công, nhân viên chúng tôi sẽ liên hệ với bạn</p>
                 </div>
                 <hr/>
              </TabPane>
            <TabPane tab="Thẻ tín dụng/Ghi nợ" key={'3'}>
                <div style={{paddingLeft: 20}}>
            <Form  layout="vertical" style={{width: '50%'}}
            initialValues={{
            remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off">
            <Radio.Group className='radioCustom'>
            <Radio value="A">
                <img alt="img" width={35} height={30} src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"/>
            </Radio>
            <Radio value="B">
                <img alt="img" width={35} height={30} src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"/>
            </Radio>
            <Radio value="C"> <img alt="img" width={35} height={30} src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"/>
            </Radio>
            </Radio.Group>
            <Form.Item  label="Số thẻ" name="cart" rules={[{ required: true, message: 'Please input your username!' }]}>
                <Input type={'number'}/>
            </Form.Item>
            <Form.Item  label="Tên trên thẻ" name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
                <Input />
            </Form.Item>
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                    <Form.Item  label="Ngày hết hạn" name="date" rules={[{ required: true, message: 'Please input your username!' }]}>
                    <Input />
                </Form.Item>
                    </Col>
                    <Col span={12}>
                    <Form.Item  label="CCV " name="ccv" rules={[{ required: true, message: 'Please input your username!' }]}>
                    <Input />
                </Form.Item>
                    </Col>
                </Row>
                <Checkbox onChange={onChange}><p style={{fontSize: 14}}>Đặt thông tin thanh toán mặc định</p>
                <p style={{marginTop: 37, fontSize: 11}}>Thông tin được mã hóa và lưu trữ an toàn.</p>
                </Checkbox>
                     </Form>
                 </div>
              </TabPane>
            </Tabs> */}
            </div>
        </div>
    </div>
  )
}

export default PayInfo