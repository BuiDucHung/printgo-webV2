import React, {useState} from 'react'
import Head from 'next/head'

import LayoutWebsite from 'components/layoutUser/Website'
import IBreadcrumb from 'components/Breadcrumb'
import PayInfo from 'components/user/PayInfo'
import RequestUtils from 'libs/RequestUtils'

const pay = () => {
  const [listAdd, setListAdd] = useState([]);
  React.useEffect(() => {
    RequestUtils.getCdp('/customer/address', null, []).then(adds => setListAdd(adds));
  }, []);

  return (
    <div>
        <Head>
            <title>Hồ sơ thanh toán</title>
        </Head>
        <div className='container'>
        <IBreadcrumb title={'Hồ sơ thanh toán'}/>
         <LayoutWebsite titleSub={'HỒ SƠ THANH TOÁN'}>
              <PayInfo listAddress={listAdd}/>
         </LayoutWebsite>
    </div>
    </div>
  )
}

export default pay