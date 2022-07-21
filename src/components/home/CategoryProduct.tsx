import { Col, Row, Typography } from 'antd'
import Link from 'next/link';
import React from 'react'
import CustomeIcon from 'utils/CustomeIcon';

import styles from 'styles/home.module.scss';
import { ProductFeatureProps } from './ProductFeature';


interface dataProps {
    filterData: ProductFeatureProps[]
}

const colStyles = {
    flexBasis: "20%",
    width: "20%",
};

const {Title, Text} = Typography;
const CategoryProduct: React.FC<dataProps> = ({filterData}) => {
   
  return (
    <div style={{marginBottom: 40}}>
        <Row gutter={[32, 32]}>
           {
            filterData.map((item, id ) => (
            <Col style={{ ...colStyles }} key={id}>
                <div className={styles.product_image}>
                    <CustomeIcon type={item.image} style={{width: '100%', height: 180}}/>
                    <Link href={'/'}><Title level={5} style={{paddingTop: 10, fontSize: 13}}>{item.name} 
                        <Text style={{color: '#3cbeb3', paddingLeft: 5}}>{item.code}</Text>
                    </Title></Link>
                    <Row gutter={[8,8]}>
                        <Col span={8} style={{paddingLeft: 0, paddingRight: 0, textAlign: 'center'}}>
                            <CustomeIcon type={'/icon/heart.svg'} style={{color: 'red' , width: 15, height: 15, marginRight: 5}}/>
                            <Text style={{fontSize: 13}}>{item.heart}</Text>
                        </Col>
                        <Col span={8} style={{paddingLeft: 0, paddingRight: 0, textAlign: 'center'}}>
                            <CustomeIcon type={'/svg/eye.svg'} style={{width: 15, height: 15, marginRight: 5}}/>
                            <Text style={{fontSize: 13}}>{item.watch}</Text>
                        </Col>
                        <Col span={8} style={{paddingLeft: 0, paddingRight: 0}}>
                            <CustomeIcon type={'/svg/eye.svg'} style={{width: 15, height: 15, marginRight: 5}}/>
                            <Text style={{fontSize: 13}}>{item.titleSub}</Text>
                        </Col>
                    </Row>
                    <div className={styles.btnPrice}>Giá chỉ từ {item.price}k/ hộp</div>
                </div>
            </Col>
            ))
           }
        </Row>
    </div>
  )
}

export default React.memo(CategoryProduct)