import React, { useState } from 'react'
import { Col, Row, Typography, Modal } from 'antd'
import styles from "styles/home.module.scss"
import Link from 'next/link'
import YouTube, { YouTubeProps }  from 'react-youtube';
import CustomeIcon from 'utils/CustomeIcon';


const opts: YouTubeProps['opts'] = {
    height: '100%',
    maxWidth: '100%',
};

const {Title, Text} = Typography
const ReviewCompany: React.FC = () => {
    const [popup, setPopup] = useState<boolean>(false);

    const onClick = () => setPopup(pre => !pre);

  return (
    <div className={styles.review}>
        <div className={styles.center} style={{paddingTop: 60}}>
            <Text className={styles.text}>nền tảng thiết kế và in ấn số 1 việt nam</Text>
            <Title level={4} className={styles.subTitle}>in ấn dễ dàng hơn cùng printgo</Title>
            <div className={styles.number} style={{marginBottom: 40}}></div>
        </div>
        <div className='container'>
            <Row gutter={6}>
                <Col span={12}>
                    <div className={styles.click_video} onClick={onClick}>
                        VIDEO HƯỚNG DẪN
                    </div>
                </Col>
                <Col span={12}>
                    <div className={styles.content}>
                        <Row gutter={[16, 16]}>
                            <Col span={4}>
                            <div className={styles.icon}>
                                <CustomeIcon type={'/img/i1.png'} style={{width: 85, height: 85}}/>
                            </div>
                            </Col>
                            <Col span={20}>
                            <div className={styles.copy_right}>
                                <Title level={4} style={{margin: 0, color: '#3897C8'}}>Bước 1. Yêu cầu thiết kế</Title>
                                <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
                            </div>
                            </Col>
                        </Row>
                    </div>
                    <div className={styles.content}>
                        <Row gutter={[16, 16]}>
                            <Col span={4}>
                            <div className={styles.icon}>
                                <CustomeIcon type={'/img/i2.png'} style={{width: 85, height: 85}}/>
                            </div>
                            </Col>
                            <Col span={20}>
                            <div className={styles.copy_right}>
                                <Title level={4} style={{margin: 0, color: '#EB7085'}}>Bước 2. Yêu cầu thiết kế và gia công</Title>
                                <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
                            </div>
                            </Col>
                        </Row>
                    </div>
                    <div className={styles.content}>
                        <Row gutter={[16, 16]}>
                            <Col span={4}>
                            <div className={styles.icon}>
                                <CustomeIcon type={'/img/i3.png'} style={{width: 85, height: 85}}/>
                            </div>
                            </Col>
                            <Col span={20}>
                            <div className={styles.copy_right}>
                                <Title level={4} style={{margin: 0, color: '#F2B029'}}>Bước 3. Kiểm tra thông tin đơn hàng</Title>
                                <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
                            </div>
                            </Col>
                        </Row>
                    </div>
                    <div className={styles.content}>
                        <Row gutter={[16, 16]}>
                            <Col span={4}>
                            <div className={styles.icon}>
                                <CustomeIcon type={'/img/i2.png'} style={{width: 85, height: 85}}/>
                            </div>
                            </Col>
                            <Col span={20}>
                            <div className={styles.copy_right}>
                                <Title level={4} style={{margin: 0, color: '#5CC0B3'}}>Bước 4. Thanh toán và nhận hàng tại nhà</Title>
                                <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
                            </div>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
            {
                popup && (
                    <Modal style={{maxWidth: 600}} visible={popup} footer={false} closable={false} onCancel={onClick}>
                    <YouTube videoId="cjYM0fHpmLU" opts={opts} style={{height: 350}}/>
                    </Modal>
                )
            }
        </div>
    </div>
  )
}

export default ReviewCompany