import { Button, Col, Input, Pagination, Row } from 'antd';
import OrderItem from 'container/order-item';
import RequestUtils from 'libs/RequestUtils';
import React, {useState, useEffect} from 'react'

const TabCohoi = ({setPriceInfo, nextPress}) => {
    const [orders, setOrders] = useState([]);
    const [filter, setFilter] = useState({page: 1, type: 'cohoi', status: 0});
    const [ page, setPage ] = useState({});
    const [itemChoise, setItemChoise] = useState([]);
  
    const pageChange = (value) => {
       setPage(pre => ({...pre, page: value}));
       setFilter(pre => ({...pre, page: value}))
    }

    useEffect(() => {
      (async() => {
        const data = await RequestUtils.getCdpDirectResult('/order/all', filter);
      setOrders(data?.embedded || []);
      setPage(pre => ({...pre, ...data?.page || {}, page: data.page?.page + 1}))
      })()

    },[filter])

    const onChoise = (id, action='add') => {
        if(action === 'add'){
            if(!itemChoise.includes(id)){
                setItemChoise(pre => pre.concat(id))
            }
        }else{
            const itemFts = itemChoise.filter(item => item !== id);
            setItemChoise(itemFts);
        }
    }

    useEffect(() => {
      setPriceInfo({
        ids: itemChoise,
        price: orders.filter(item => itemChoise.includes(item.id)).reduce(( sum, { total } ) => sum + total , 0)
     })
    },[itemChoise])

  return Array.isArray(orders) && orders.length ? <>
        <div className='content-order'>
            <Row gutter={[8]}>
            {
                orders.map((item, key) => 
                    <Col span={8} xs={24} sm={12} xl={8} key={key}>
                    <OrderItem key={key} order={item} onChoise={onChoise} nextPress={nextPress}/>
                    </Col>
                 )
            }
            </Row>
        </div>
        {
            itemChoise.length ? (
             <DiscountCode/>
            ) : (null)
        }
        {
            page.totalPages > 1 &&  <div style={{display: 'flex', justifyContent: 'flex-end'}}>
            <Pagination onChange={pageChange} defaultCurrent={page.page} total={page.totalElements} defaultPageSize={page.size}/>
            </div>
        }
  </> : (
       <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 630px)'}}>
       B???n ch??a c?? ????n n??o trong gi??? h??ng
     </div>
  )
}

const DiscountCode = () => {
    const [close, onClose] = useState(true);
    const [error, raiseErr] = useState(false);
    const onSubmit = () => raiseErr(true);

    return <>
    <div style={{padding: 20, background: '#eafcfc', marginTop: 10, borderRadius:5}}>
    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div><b>M?? gi???m gi??</b></div>
        <div onClick={()=>onClose(pre => !pre)}>
          <span>Ch???n m?? gi???m gi??</span> 
        </div>
      </div>
    </div>
    { !close ? (
        <div>
            <div style={{display: 'flex', gap: 8 , justifyContent: 'space-around', alignItems: 'center'}}>
                <Input placeholder='Nh???p m?? gi???m gi??' type={'text'} />
                <Button onClick={onSubmit} style={{background: 'red', color: 'white'}} >??p d???ng</Button>
            </div>
            {error && <p style={{paddingTop:10}} >M?? kh??ng h???p l??? .!</p>}
        </div>
    ) : (null)

    }
    </>

}

export default TabCohoi