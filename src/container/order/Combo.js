import { Typography } from 'antd';
import { decodeProperty } from 'libs';
import React, {useState, useCallback } from 'react'
import {CaretDownOutlined, CaretUpOutlined} from '@ant-design/icons'

import styles from 'styles/myOrder.module.scss';
import { money } from 'utils';

import { DetailBox } from './DetailBox';


const {Title} = Typography;
const Combo = ({dayDuote, productPractice, dongia, soluong, unit, decode, libary }) => {
   
    const [more, setMore] = useState(false)
    decodeProperty(productPractice, ["extraData"]);
   
    const onClick = useCallback(() => {
            setMore(pre => !pre);
    },[more])

   


  return (
    <div style={{padding: '10px 0px'}}>
        <Title level={5}>THÔNG TIN IN ẤN</Title>
        <hr/>
        <div className={styles.ct__content}>
        <Title level={5}>Thời gian dự kiến</Title>
        <span>{dayDuote === null ? 'N/A' : dayDuote} ngày</span>
        </div>

        <div className={styles.ct__content}>
        <Title level={5}>Đơn giá</Title>
        <span className={styles.price}>{money(dongia)} đ</span>
        </div>

        <div className={styles.ct__content}>
        <Title level={5}>Số lượng</Title>
        <span >{soluong} {unit}</span>
        </div>
        <div className={styles.hrb}></div>

        <div className={styles.ct__content} style={{marginTop: 15}}>
        <Title level={5}>Chi phí in ấn</Title>
        <span className={styles.price}>{money(dongia * soluong)} đ</span>
        </div>

        <div className={styles.showDetail} onClick={onClick}>
            <span>Chi tiết</span>
            {!more ? <CaretDownOutlined /> : <CaretUpOutlined />}
        </div>
        {more ? <DetailBox decode={decode} productPractice={productPractice} libary={libary}/> : null}
    </div>
  )
}

export default React.memo(Combo) 