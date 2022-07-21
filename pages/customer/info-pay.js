import React, {useState} from 'react'
import Head from 'next/head'

import LayoutWebsite from 'components/layoutUser/Website'
import IBreadcrumb from 'components/Breadcrumb'
import PayInfo from 'components/user/PayInfo'
import RequestUtils from 'libs/RequestUtils'

import CreateAddress from 'components/user/CreateAddress'
import { message } from 'antd'

const Pay = () => {
   const [listAdd, setListAdd] = useState([]);
   const [address, setAddress] = useState();
   const [reload, setReload] = useState(false);

  React.useEffect(() => {
    RequestUtils.getCdp('/customer/address', null, []).then(adds => setListAdd(adds));
  }, [reload]);

  const onDelete = async(id) => {
    const data = await RequestUtils.getCdp('/customer/delete-address', {id: id}, null);
    if(data){
      setReload(!reload);
      return message.success('Xóa địa chỉ đơn hành thành công');
    }else {
      return message.error('Xóa địa chỉ không thành công');
    }
  }

  return (
    <div>
        <Head>
            <title>Thông tin thanh toán</title>
        </Head>
        <div className='container'>
        <IBreadcrumb title={'Hồ sơ thanh toán'}/>
         <LayoutWebsite titleSub={'HỒ SƠ THANH TOÁN'}>
            <PayInfo onEdit={(add) => setAddress(add)} listAddress={listAdd} setAddress={setAddress} onDelete={onDelete}/>
         </LayoutWebsite>
    </div>
    <CreateAddress
       onClose={()=> {
        setAddress(undefined);
        setReload(!reload);
      }}
      address={address} 
    />
    </div>

  )
}

export default Pay