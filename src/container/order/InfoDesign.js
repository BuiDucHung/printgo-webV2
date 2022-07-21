import React, {useState, useCallback, useEffect} from 'react'
import { Typography } from 'antd';
import {CaretUpOutlined, CaretDownOutlined} from '@ant-design/icons';

import styles from 'styles/myOrder.module.scss';
import { formatTimeDone } from 'components/user/User-utils';
import { money } from 'utils';

import { decodeProperty } from 'libs';

const {Title , Text} = Typography;
const InfoDesign = ({data, kichthuoc}) => {
    const [ more, setMore ] = useState(false);
    const [ addRequire, setRequire ] = useState([]);
    const onClick = useCallback(() => {
        setMore(pre => !pre)
    },[more])

    useEffect( () => {
        decodeProperty(data, ['addRequire']);
        if(data.addRequire && Array.isArray(data.addRequire)) {
          let newData = [];
          for(let item of data.addRequire) {
            if(!item.value) {
              continue;
            }
            newData.push(item);
          }
          setRequire(newData);
        }
      }, [data]);

  return (
    <div style={{marginTop: 25}}>
        <Title level={4}>THÔNG TIN THIẾT KẾ</Title>
        <div className={styles.ct__content}>
            <Title level={5}>Thời gian dự kiến trả file</Title>
            <Text>{data.confirmTime ? formatTimeDone(data.confirmTime) : 'N/A'}</Text>
        </div>
        <div className={styles.ct__content}>
            <Title level={5}>Kích thước</Title>
            <Text>{kichthuoc || 'N/A'}</Text>
        </div>
        <div className={styles.hrb}></div>
        <div className={styles.ct__content} style={{paddingTop: 15}}>
            <Title level={5}>Chi phí thiết kế</Title>
            <Text className={styles.price}>{data.designFee ? (money(data.designFee) + ' đ') : 'Không tính phí'}</Text>
        </div>
        <div className={styles.showDetail} onClick={onClick}>
            <Text>Chi tiết</Text>
            {!more ? <CaretDownOutlined /> : <CaretUpOutlined />}
        </div>
        {
            more ? (
                <>
                <div className={styles.ct__content}>
                    <Title level={5}>Màu sắc</Title>
                    <span>{data.color}</span>
                </div>
                <div className={styles.ct__content}>
                    <Title level={5}>Lĩnh vực</Title>
                    <span>{data.linhvuc}</span>
                </div>   
                <div className={styles.ct__content}>
                    <Title level={5}>Phong cách</Title>
                    <span>{data.phongcach}</span>
                </div>  
                {addRequire.map((item, key) => (
                    <div key={key} >
                    <p style={{marginBottom: 0.5}}>{item.name}:</p>
                    <p><u>{item.value}</u></p>
                    </div>
                ))}
                <div className={styles.ct__content}>
                    <Title level={5}>Nội dung thiết kế</Title>
                    <span>{data.noidung}</span>
                </div>
                </>
            ) : (null)
        }
    </div>
  )
}

export default React.memo(InfoDesign)