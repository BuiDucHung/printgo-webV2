import React, {useContext} from 'react';
import { Button, message, Modal, Typography } from 'antd';
import { useRouter } from 'next/router';
import { OrderContext } from 'components/context/OrderContext';
import {CheckCircleOutlined} from '@ant-design/icons';

import styles from 'styles/user.module.scss';
import RequestUtils from 'libs/RequestUtils';

const {Title, Text} = Typography;
export const ThankyouComplete = ({dtCode, onClose}) => {
    const router = useRouter();
    const value = useContext(OrderContext);
    const {id, paid, total} = value;
    const params = { orderIds: id, price: (total - paid) };
    
    const monney = (paid/total)*100;
    const valueMons = 100 - monney;

    const handleSubmitPayment = async() => {
        const str = await RequestUtils.postCdpDirectResult('/order/create-history-pay', params); 
        if(!str) {
            message.error('Đã có lỗi đường truyền, vui lòng thử lại sau .!');
            return;
        }
        window.location.href = str;
    }
    

  return (
    <div>
        <Modal style={{maxWidth: 450 , marginTop: '10%'}} visible={true} footer={false} closable={false}>
       <div style={{padding: 10}}>
        <div onClick={onClose} style={{position:'absolute', top: 7, right: 8, cursor:'pointer'}}>
                <img style={{width: 30}} src='/svg/close.svg' />
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <img style={{width: 150}} src='/img/print_from_design.png' />
            </div>
            {
                params.price > 5000 ? (
                    <>
                        <Title level={3} style={{textAlign: 'center'}}>Chúc mừng bạn đã xây dựng thành công bản thiết kế</Title>
                        <Text style={{textAlign: 'center', fontSize: 16, display: 'block'}}>
                            Bạn cần thanh toán nốt {valueMons}% giá trị đơn hàng để tải về file thiết kế 
                        </Text>
                        <Button className={styles.btnSub} onClick={handleSubmitPayment} style={{marginBottom: 20}} htmlType={'submit'}>
                            <CheckCircleOutlined style={{color: '#fff'}}/>
                            <Text style={{marginLeft: 10, color: '#fff'}}>THANH TOÁN NGAY</Text>
                        </Button>
                    </>
                ) : (
                    <>
                        <Title level={3} style={{textAlign: 'center'}}>Chúc mừng bạn đã xây dựng thành công bản thiết kế</Title> 
                        <Text style={{textAlign: 'center', fontSize: 16, display: 'block'}}>
                            Chúng tôi sẽ tiến hành triển khai In ấn và gia công
                        </Text>
                        <Button  className={styles.btnSub} style={{marginBottom: 20}} htmlType={'submit'}>
                            <CheckCircleOutlined style={{color: '#fff'}}/>
                            <Text style={{marginLeft: 10, color: '#fff'}}>Chuyển in</Text>
                        </Button>
                    </>
                )
            }
       </div>
        </Modal>
    </div>
  )
}
