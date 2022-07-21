import React, {useState, useCallback} from 'react'
import { Button, Col, Form, Input, message, Row, Typography, Image } from 'antd';
import {CheckCircleOutlined} from '@ant-design/icons';

import { DEPARTMENT_DESIGNER, STATUS_DESIGN } from 'const';
import CustomeIcon from 'utils/CustomeIcon';
import styles from 'styles/user.module.scss';
import { formatTimeCreate, formatTimeDone } from './User-utils';
import { IconUser } from './IconUser';
import { chunk } from 'methods/Data';
import { URL_CDP } from 'config';

import RequestUtils from 'libs/RequestUtils';
import { ThankyouComplete } from './ThankyouComplete';

const {Title, Text} = Typography;
const OrderHistory = React.memo(({detailEdits, status}) => {
 
  let numOfEdit, tmpNumOfEdit = 0;
  let countNumberDesign = detailEdits.filter(item => item.department === DEPARTMENT_DESIGNER).length;
  const maximumId = Math.max.apply(Math, detailEdits.map(function(o) { return o.id; }));

  return detailEdits.length ? (
    <div>
      <Title level={5}>Lịch sử chỉnh sửa</Title>
      <div className={styles.time_left}>
        {
          detailEdits.map((item, id) => {
            const isDesign = item.department === DEPARTMENT_DESIGNER;
            if(isDesign){
              tmpNumOfEdit += 1;
              numOfEdit = countNumberDesign - tmpNumOfEdit;  
            }
            return <ItemEdit
            status={status}
            inEnd={maximumId === item.id}
            numOfEdit={numOfEdit} 
            isDesign={isDesign}
            key={id}
            data={item}
            />
          })
        }
      </div>
    </div>
  ) : ''
})

const ItemEdit = ({data, status, inEnd, numOfEdit, isDesign}) => {
    const [ showMore, setShowMore ] = useState(false);
    const textnumberEdit = numOfEdit === 0 ? 'Thiết kế tải file' : `Chỉnh sửa lần ${numOfEdit}`;
    const itemChunk = chunk(data.listFile, 3);
    const openMore = useCallback( () => {
      setShowMore( pre => !pre)
    }, [showMore]);

  return (
    <div style={{position: 'relative'}}>
        <Row>
          <Col span={8}>
          <CustomeIcon type={'/svg/step-active.svg'} style={{position: 'absolute', top: numOfEdit !== 0 ? -5 : 0, left: -11, width: 20}}/> 
         <div style={{display: 'flex', marginLeft:15, gap: 5}} onClick={openMore}>
         <CustomeIcon type='/svg/edit.svg' style={{width: 15, marginTop: -12}} />
          <Title level={5} style={{color: 'var(--colorPrimary)', cursor: 'pointer', marginTop: -3}}>{isDesign ? textnumberEdit : 'Yêu cầu chỉnh sửa'}</Title>
         </div>
          </Col>
          <Col span={8} offset={8}>
            <Text style={{textAlign: 'end', display: 'block'}}>{formatTimeDone(data.inTime)}</Text>
          </Col>
        </Row>
        {
          isDesign && (inEnd || showMore) ? (
            <div style={{display: 'flex', marginLeft: 10}}>
            <IconUser w={40} h={40} uName={data.userName}/>
            <div style={{marginLeft: 10}}>
              <Title level={5} style={{margin: 0}}>{data.userName}</Title>
              <Text>Nhà thiết kế danh tiếng</Text>
            </div>
          </div>
          ) : null}
        { numOfEdit !== 0 ? <hr/> : null }
        {
         inEnd || showMore ? (
            <div style={{marginLeft:15}}>
                <Title level={5} style={{margin: 0}}>Tập tin đã được tải lên</Title>
                <Text>{formatTimeCreate(data.inTime)}</Text>
                <br/><br/>
                { itemChunk.map( (imgs, id) => (
                <div key={id}>
                  {imgs.map ((img, sid) => (<div key={sid}><Image style={{maxWidth: '100%'}} src={URL_CDP + img}/></div>))}
                </div>
                ))
              }
               { itemChunk.length <= 0 ? 'Không có file đính kèm yêu cầu chỉnh sửa' : '' }
               <br/><br/>
               <Title level={5} style={{margin: 0}}>Nội dung mô tả thiết kế</Title>
               <Text style={{paddingTop: 8}}>{data.note || 'Nội dung không được cập nhật'}</Text>
               <br/><br/>
            </div>
          ) : ''
        }
        {
            isDesign && inEnd && STATUS_DESIGN.includes(status) ? (
            <RequireEdit id={data.id} dtCode={data.customerOrderDetailCode} onclose={onclose}/>
          ) : (inEnd && !STATUS_DESIGN.includes(status)) ? (
            <div style={{display: 'flex', justifyContent: 'center', marginBottom: 5}}>
            {showMore ? <>
              <CheckCircleOutlined className={styles.colorIcon}/>
              <span style={{marginLeft: 10}}>Đã chốt thiết kế</span>
            </> : null}
          </div>
          ): (null)
        }
        { showMore && numOfEdit === 0 ? (<CustomeIcon type={'/svg/step-active.svg'} style={{position: 'absolute', bottom: -5, left: -11, width: 20}} />) : (null)}
    </div>
  )
}

const RequireEdit = ({id, dtCode}) => {
  const [form] = Form.useForm();
  const [ openForm, setOpen ] = useState(false);
  const callBackEdit = useCallback( () => {
    setOpen(open => !open)
  }, [openForm]);

    const [ loading, setLoading ] = useState(false);
    const [ isSubmit, setIsSubmit ] = useState(false);
    const [ openThanks, setOpenThanks ] = useState(false);


    const handleSubmit = async (value) => {
        setLoading(true);
        if(openForm) {
          const listFile = value.fileUpload ? [value.fileUpload] : [];
          try {
            const data = await RequestUtils.postCdpDirectResult('/cdp/reject-design', {...value, listFile}, {id:id});
            return message.success(data.message ? `${data.message}` : 'Yêu cầu đã được gửi') ;

          } catch (error) {
            error && message.error('Lỗi gửi thông tin yêu cầu');
          }
        }else {
          try {
          const data = await RequestUtils.getCdpDirectResult(`/cdp/confirm-design`,{id: id});
            // if(data) {
            //   return message.success('Chốt thiết kế thành công');
            // }
            data && setIsSubmit(true);
            setLoading(false);
            setOpenThanks(true);
          } catch (error) {
            error && message.error('Lỗi chốt thiết kế');
          }
        }
    }

  return (
    <div>
       {
         isSubmit ? null : (
           <div >
             {
                <Form form={form} layout="vertical" style={{marginLeft: 15}} onFinish={handleSubmit}>
                 {
                   openForm ? (
                    <>
                      <Form.Item name='fileUpload' label="Đường dẫn file" rules={[{required: true, message: 'Vui lòng nhập đường dẫn file'}]}>
                      <Input style={{height: 35}} placeholder='Đường dẫn file nếu có'/>
                    </Form.Item>
                    <Form.Item name='note' label="Ghi chú thiết kế" rules={[{required: true, message: 'Vui lòng nhập ghi chú'}]}>
                      <Input style={{height: 35}}  placeholder='Nhập ghi chú thiết kế'/>
                    </Form.Item>
                    </>
                   ) : null
                 }
                {
                  !openForm ? (
                    <Button disabled={loading} className={styles.btnSub} onClick={callBackEdit} >
                    Yêu cầu chỉnh sửa
                  </Button>
                  ) : (
                    <Button disabled={loading} className={styles.btnSub} htmlType="submit">
                    Gửi yêu cầu
                  </Button>
                  )
                }
                 {
                   !openForm ? (
                    <Button disabled={loading} className={`${styles.btnDesign} ${styles.btnSub}`} style={{background: '#3dbeb3', marginBottom: 20}} htmlType="submit">
                    <CheckCircleOutlined />
                    <Text style={{marginLeft: 10, color: '#fff'}}>Chốt thiết kế</Text>
                  </Button>
                   ) : null
                 }
                </Form>
             }
           </div>
         )
       }
       {openThanks && <ThankyouComplete onClose={() => setOpenThanks(false)}  dtCode={dtCode} />}
    </div>
  )
}

export default OrderHistory