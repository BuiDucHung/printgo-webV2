import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Typography } from 'antd';

import {GATEWAY, API, colorStatus} from 'config'
import styles from 'styles/home.module.scss';
import axios from 'axios';

import CustomeIcon from 'utils/CustomeIcon';
import Link from 'next/link';
import Item from 'antd/lib/list/Item';

interface NewsCateProps {
  id: number,
  image: string,
  date: string,
  eye: string,
  name: string,
  text: string,
  statusColor: number
}

const {Title, Text} = Typography;
const NewPringo: React.FC<NewsCateProps> = () => {
  const [newsCate, setNewsCate] = useState<NewsCateProps[]>([]);
  
  useEffect(() => {
    try {
      const newsPrintgo = async() => {
        const {data} = await axios.get<NewsCateProps[]>(`${GATEWAY}/${API.DATA_NEW_CATE}`);
        setNewsCate(data);
      }
      newsPrintgo();
    } catch (error) {
      console.log(error);
    }
  },[])


  return (
    <div>
      <div className={styles.center} style={{paddingTop: 60}}>
            <Text className={styles.text}>cập nhập tin tức, xu hướng thiết kế in ấn</Text>
            <Title level={4} className={styles.subTitle}>tin tức printgo</Title>
            <div className={styles.number} style={{marginBottom: 40}}></div>
      </div>
      <div className='container' style={{marginBottom: 90}}>
        <Row gutter={16}>
           {
             newsCate.map((item, id) => (
              <Col span={6} key={id}>
                <div className={styles.card_header}>
                 <Link href={'/'}><CustomeIcon type={item.image} style={{width: '100%', height: 187, cursor: 'pointer' ,objectFit: 'cover'}}/></Link>
                 <div className={styles.card_content}>
                    <div className={styles.ht_oneline}>
                        <div className={styles.flext}>
                        <CustomeIcon type={'/svg/clock.svg'} style={{width: 12, height: 13, color: '#3cbeb3'}}/>
                        <Text>{item.date}</Text>
                        </div>
                        <div className={styles.flext}>
                        <CustomeIcon type={'/svg/eye.svg'} style={{width: 16, height: 16, color: '#3cbeb3'}}/>
                        <Text>{item.eye}</Text>
                        </div>
                    </div>
                    <Link href={'/'}><Title level={5} className={styles.title}>{item.name}</Title></Link>
                    <div className={styles.excerpt}>
                      <Text>{item.text}</Text>
                    </div>
                 </div>
                </div>
                <div className={styles.btn_new1}>
                  <Link href={'/'}><Button type='primary' className={styles.btn_detail} style={{background: colorStatus(item.statusColor)}}>xem chi tiết</Button></Link>
                </div>
              </Col>
             ))
           }
           <Col span={6}>
           <div className={styles.card_header}>
                 {
                   newsCate.map((item, index) => (
                    <div className={styles.card_content} key={index}>
                    <div className={styles.ht_oneline} style={{display: 'block'}}>
                    <Link href={'/'}><Title level={5} className={styles.title} style={{padding: 0, paddingTop: 5}}>
                        {item.name}
                      </Title></Link>
                     <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 10}}>
                     <div className={styles.flext}>
                        <CustomeIcon type={'/svg/clock.svg'} style={{width: 12, height: 13, color: '#3cbeb3'}}/>
                        <Text>{item.date}</Text>
                      </div>
                      <div className={styles.flext}>
                        <CustomeIcon type={'/svg/eye.svg'} style={{width: 16, height: 16, color: '#3cbeb3'}}/>
                        <Text>{item.eye}</Text>
                      </div>
                     </div>
                    </div>
                 </div>
                   ))
                 }
                </div>
                <div className={styles.btn_new1}>
                  <Link href={'/'}><Button type='primary' className={styles.btn_detail} style={{background: '#fff000', color: '#000'}}>xem chi tiết</Button></Link>
                </div>
           </Col>
        </Row>
      </div>
    </div>
  )
}

export default NewPringo