import React, {useState, useEffect} from 'react'
import styles from 'styles/home.module.scss';

import { Button, Col, Row, Typography } from 'antd';
import axios from 'axios';
import CustomeIcon from 'utils/CustomeIcon';
import { GATEWAY, API } from 'config';

const {Title, Text} = Typography;

interface BusinessFieldpProps {
    id: number,
    title: string,
    icon: string,
    text: string,
}
const LIMIT = 6;
const FieldBusiness: React.FC<BusinessFieldpProps> = () => {
    const [besiness, setBesiness] = useState<BusinessFieldpProps[]>([]);
    const [loading , setLoading] = useState<boolean>(false);
    const [curPage, setCurPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const loadMoreOnClick = () => {
        if (loading) return;
        setCurPage((prev) => prev + 1);
    }
    useEffect(() => {
        setLoading(true);
        try {
            const besinesss = async () => {
                const {data} = await axios.get<BusinessFieldpProps[]>(`https://62d40a725112e98e48497bdf.mockapi.io/api/product/business?page=${curPage}&limit=${LIMIT}`);
                setHasMore(data.length > 0);
                setBesiness((prev) => [...prev, ...data]);
            }
            besinesss();
        } catch (error) {
            console.log(error);
        }finally {
           setTimeout(() =>  setLoading(false),1000)
        }
    },[curPage])
    
  return (
    <div className='container'>
        <div className={styles.center}>
            <Text className={styles.text}>6 lĩnh vưc in ấn phổ biến nhất</Text>
            <Title level={4} className={styles.subTitle}>lĩnh vực kinh doanh</Title>
            <div className={styles.number} style={{marginBottom: 40}}></div>
        </div>
        <Row gutter={[32, 32]} style={{paddingLeft: 0}}>
           {
               besiness.map((item, id) => (
                <Col span={8} key={id}>
                <div className={styles.boxWrap}>
                    <Row gutter={[16, 16]} style={{padding: 15}}>
                        <Col span={8} >
                            <div style={{textAlign: 'center', marginTop: 15}}>
                            <CustomeIcon type={item.icon} className={styles.icon_image}/><br/>
                            <Button type='primary' className={styles.btnWatch}>Xem</Button>
                            </div>
                        </Col>
                        <Col span={16} >
                            <Title level={4} style={{margin: 0, color: '#3dbeb3', textTransform: 'uppercase'}}>{item.title}</Title>
                            <Text>{item.text}</Text>
                        </Col>
                    </Row>
                </div>
            </Col>
               ))
           }
        </Row>
        {
            hasMore && (<Button disabled={loading} loading={loading} type='primary' onClick={loadMoreOnClick} className={styles.btn_watch__many}>{loading ? "Loading..." : "xem nhiều hơn"}</Button>)
        }
    </div>
  )
}

export default FieldBusiness