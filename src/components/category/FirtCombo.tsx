import { Carousel, Col, Row } from 'antd';
import React from 'react'
import { Typography } from 'antd';

import styles from 'styles/category.module.scss';
import { price } from 'config';

interface DataCombo {
    id: number,
    chuyenMucId: number,
    cmName: string,
    code: string,
    createdAt: number,
    days: number,
    libraryGroup: string,
    listMedia: [],
    listProperty: [],
    listTitle: [],
    manufacturPrice: null,
    nameCombo: string,
    printingPrice: number,
    priority: number,
    productPracticeJson: object,
    quantity: number,
    unit: string,
    username: string,
}

interface DataCombosProps {
    datas: DataCombo[]
}

const {Title, Text} = Typography;
const FirtCombo: React.FC<DataCombosProps> = ({datas}) => {
    console.log(datas);
    const model = (datas && datas.length) ? datas[0] : undefined;
    console.log(model);
    
  return (
    <div>
        <div className={styles.backgroudWrap}>
            <Row gutter={60}>
                <Col span={12}>
                 <div style={{marginBottom: 30}}>
                 <Title level={3} style={{textTransform: 'uppercase'}}>{model?.cmName ? `file ${model?.cmName} tiêu chuẩn` : null}</Title>
                 <Carousel>
                 { model?.listMedia.map( (media, key) => (
                    <img
                    key={key}
                    src={`${price}${media}`}
                    alt={model.cmName}
                    style={{ width: "100%", verticalAlign: "top" }}
                    onLoad={() => window.dispatchEvent(new Event("resize"))}
                    />
                ))}
                 </Carousel>
                 </div>
                </Col>
                <Col span={12}>
                    <div style={{marginBottom: 30}}>
                        <Text>{model?.cmName}</Text>
                    </div>      
                </Col>
            </Row>
        </div>
    </div>
  )
}

export default FirtCombo