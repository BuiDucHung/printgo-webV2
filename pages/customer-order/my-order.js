import React, {useState} from 'react'
import { Tabs } from 'antd'
import Head from 'next/head'

import IBreadcrumb from 'components/Breadcrumb'
import LayoutWebsite from 'components/layoutUser/Website'
import TabCohoi from 'components/user/TabCohoi'
import RequestUtils from 'libs/RequestUtils'
import TabDangXL from 'components/user/TabDangXL'
import TabOrderDone from 'components/user/TabOrderDone'



const { TabPane } = Tabs;
const TabOrder = () => {
    const [priceInfo, setPriceInfo] = useState({});
  
    const nextPress = async () => {
        const { ids, price } = priceInfo;
        const strIds = ids.map(item => item).join('');
        const res = await RequestUtils.postCdpDirectResult('/order/create-history-pay', {orderIds: strIds, price: price});
        if(res) {
            window.location.href = res;
        }
    }
    
  return (
    <div>
        <Head>
            <title>Đơn hàng của tôi</title>
        </Head>
        <div className='container'>
            <IBreadcrumb title={'Đơn hàng của tôi'}/>
            <LayoutWebsite titleSub={'ĐƠN HÀNG CỦA TÔI'}>
               <Tabs>
                   <TabPane tab="Chờ thanh toán" key="1">
                        <TabCohoi setPriceInfo={setPriceInfo} nextPress={nextPress}/>
                   </TabPane>
                   <TabPane tab="Đang xử lý" key="2">
                         <TabDangXL/>
                   </TabPane>
                   <TabPane tab="Hoàn thành" key="3">
                        <TabOrderDone/>
                   </TabPane>
               </Tabs>
            </LayoutWebsite>
        </div>
    </div>
  )
}

export default TabOrder