import React, {useState} from 'react'
import { Button, Col, Popconfirm, Radio, Row, Space, Table, Typography } from 'antd';
import {DeleteOutlined} from '@ant-design/icons';
import styles from 'styles/payInfo.module.scss'
import btn from 'styles/customerUser.module.scss'
import { PlusSquareOutlined, FormOutlined } from '@ant-design/icons';

import { useStore } from 'StoreContext';
import { updateStore } from 'methods/user';

const { Title } = Typography;

const PayInfo = ({listAddress, setAddress, onEdit, onDelete}) => {
    
    const { state: {user}} = useStore();
    const getData = listAddress.map((item) => ({id: item.id , receiverName: item.receiverName, 
      mobilePhone: item.mobilePhone, address: item.address, provinceId: item.provinceId, districtId: item.districtId,
      customerId: item.customerId, wardId: item.wardId, isDefault: item.isDefault}));
    const [currentPay, setCurrentPay] = useState(user?.payMethod || 'CK');


      
    const columns = [
      {
        title: 'Họ tên',
        dataIndex: 'receiverName',
        key: 'receiverName',
        onCell: (record) => ({
          style: {
            backgroundColor: record.isDefault == 1 ? '' : '#dcdcdc'
          }
        })
      },
      {
        title: 'Số điện thoại',
        dataIndex: 'mobilePhone',
        key: 'mobilePhone',
        onCell: (record) => ({
          style: {
            backgroundColor: record.isDefault == 1 ? '' : '#dcdcdc'
          }
        })
      },
      {
        title: 'Địa chỉ',
        key: 'address',
        dataIndex: 'address',
        onCell: (record) => ({
          style: {
            backgroundColor: record.isDefault == 1 ? '' : '#dcdcdc'
          }
        })
      },
      {
        title: 'Thao tác',
        key: 'action',
        render: (_, record) => (
        <Space size="middle">
        <p onClick={() => onEdit(record)} style={{cursor: 'pointer'}}><FormOutlined className={styles.update}/> Sửa</p>
        <Popconfirm title="Bạn có chắc chắn muốn xóa" onConfirm={(() => onDelete(record.id))}>
          <p style={{cursor: 'pointer'}}><DeleteOutlined className={styles.delete}/> Xóa</p>
        </Popconfirm>
          </Space>
        ),
        onCell:(record) => ({
          style: {
            backgroundColor: record.isDefault == 1 ? '' : '#dcdcdc'
          }
        })
      },
    ];
  
    const onSubmit = () => {
      updateStore({...user, payMethod: currentPay})
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
                <Button onClick={() => setAddress({})} icon={<PlusSquareOutlined />} className={btn.upLoad}>THÊM ĐỊA CHỈ MỚI</Button>
                </div>
                </Col>
            </Row>
            <hr/>
              <div>
              <Table pagination={false} dataSource={getData} columns={columns}/> 
              <p style={{paddingTop: 15,fontSize: 13, fontStyle: 'italic'}}><span style={{color: 'red', fontSize: 13, fontWeight: 500}}>
              <b>*Lưu ý:</b>
              </span> Địa chỉ được chọn phía trên (dòng sáng) sẽ là địa chỉ mặc định để giao hàng</p>
              </div>
        </div>
        <div className={styles.infoPay}>
            <Title level={2} className={styles.title}>Phương thức thanh toán</Title>
            <hr/>
            <div style={{paddingLeft: 20}}>
            <Radio.Group defaultValue="CK" onChange={((e) => setCurrentPay(e.target.value))}>
            <Radio value='CK'>Chuyển khoản</Radio>
            <Radio value='QR'>Mã QR Code</Radio>
            </Radio.Group>
          </div>
          <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <Button htmlType="submit" onClick={onSubmit} className={btn.Submit} style={{marginBottom: 20}}>Cập nhập</Button>
            </div>
        </div>
    </div>
  )
}

export default PayInfo