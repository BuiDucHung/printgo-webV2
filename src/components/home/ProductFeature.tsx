import { Col, Row, Typography, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import {LeftOutlined, RightOutlined} from '@ant-design/icons';
import Link from 'next/link'
import { GATEWAY, API } from 'config';
import {chunk} from 'methods/Data';
import styles from 'styles/home.module.scss';
import axios from 'axios';
import CategoryProduct from './CategoryProduct';
import TabcateData from './TabcateDataRight';
import { TabcateDataLeft } from './TabcateDataLeft';

const { TabPane } = Tabs;
const {Title, Text} = Typography;

export interface ProductFeatureProps {
    id: number,
    image: string,
    name: string,
    code: string,
    heart: number,
    watch: number,
    titleSub: string,
    price: number,
    keyId: number
}

export interface CategoryProps {
    id: number,
    name: string
}

const SIX: number = 6;
const SEVENT: number = 7;
const ONE: number = 1;

const ProductFeature: React.FC<ProductFeatureProps & CategoryProps> = () => {

  const [productFeature, setProductFeature] = useState<ProductFeatureProps[]>([]);
  const [filterData, setFiterData] = useState<ProductFeatureProps[]>([]);
  const [category, setCategory] = useState<CategoryProps[][]>([]);
  const [newCate, setNewCate] = useState<CategoryProps[]>([]);
  const [curent, setCurent] = useState<string>(ONE.toString());
  const [displays, setDisplays] = useState<boolean>(false)

  const onChange = (key: string) => {  
    setCurent(key);
    const data = productFeature.filter((item) => String(item.keyId) === key) ;
    setFiterData(data)
  };

  const handleNext = () => {
       setCurent(pre => (Number(pre) + ONE).toString());
      const data = productFeature.filter((item) => String(item.keyId) === curent);
 
      setFiterData(data);   
       if(Number(curent) >= SIX) {
        setDisplays(true);
      }
       if(Number(curent) >= newCate.length) {
        return setCurent((newCate.length).toString());
      }
  }

  const handlePree = () => {
      setCurent(pre => (Number(pre) - ONE).toString());
      const data = productFeature.filter((item) => String(item.keyId) === curent);
      setFiterData(data);
      if(Number(curent) <= SEVENT) {
        setDisplays(false);
      }
      if(Number(curent) <= ONE) {
        return setCurent(ONE.toString());
      }
  }

  useEffect(() => {
    const featureProduct = async () => {
      const {data} = await axios.get<ProductFeatureProps[]>(`${GATEWAY}/${API.DATA_PRODUCT_OUTSTANDING}`);
      setFiterData(data.filter(item => String(item.keyId) === ONE.toString()));
      setProductFeature(data);
    }

    const categoryProduct = async () => {
      const {data} = await axios.get<CategoryProps[]>(`${GATEWAY}/${API.DATA_CATEGORY}`);
      const item = chunk(data, 6);      
      setCategory(item);
      setNewCate(data)
    
    }
    featureProduct();
    categoryProduct();
  },[setFiterData])

  return (
    <div className='container' style={{marginBottom: 40}}>
      <Row gutter={[16, 16]}>
        <Col span={6}>
        <Title  className={styles.ht_tile} level={3}>SẢN PHẨM <Text className={styles.pinks}>nổi bật</Text></Title>
        </Col>
        <Col span={18}>
          <Tabs activeKey={curent} defaultActiveKey={curent} onChange={onChange}>
          {
              category[0]?.map((item, index) => (
                <TabPane tab={item?.name} key={index + 1}/>
              ))
          }
          {
            category[1]?.map((item, index) => (
                displays && <TabPane tab={item?.name} key={index + 1}/>
            ))
          }
        </Tabs>
        <div style={{position: 'absolute', top: 0, right: 80, }}>
        <LeftOutlined style={{fontSize: 23, cursor: 'pointer'}} onClick={handlePree}/>
        <RightOutlined style={{fontSize: 23, cursor: 'pointer'}} onClick={handleNext}/>
        </div>
          <div style={{position: 'absolute', top: 0, right: 0}}>
            <Link href={'/'}>Xem tất cả</Link>
          </div>
        </Col>
      </Row>
      <CategoryProduct filterData={filterData}/>

      <Row gutter={[16, 16]} style={{marginTop: 20}}>
        <Col span={8}>
          <img src='https://printgo.vn/uploads/banners/0/xf2c672a10c0c5bcd09a14be51019cda5.jpg.pagespeed.ic.BiopWOPtjI.webp' width={'100%'}height={'100%'}/>
        </Col>
        <Col span={16}>
        <img src='https://printgo.vn/uploads/banners/0/e545c896d409b525c0579cc15ec689f6.png.pagespeed.ce.SdP9WSTNX1.png' width={'100%'}height={'100%'}/>
        </Col>
      </Row>
    </div>
  )
}


export default React.memo(ProductFeature)