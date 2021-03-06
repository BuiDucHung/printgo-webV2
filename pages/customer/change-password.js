import React from 'react'
import Head from 'next/head'

import LayoutWebsite from 'components/layoutUser/Website'
import IBreadcrumb from 'components/Breadcrumb'
import ChangePass from 'components/user/ChangePass'



const changePassword = () => {
 
  return (
    <div>
    <Head>
        <title>Hồ sơ thanh toán</title>
    </Head>
    <div className='container'>
    <IBreadcrumb title={'Đổi mật khẩu'}/>
     <LayoutWebsite titleSub={'ĐỔI MẬT KHẨU'}>
        <ChangePass/>
     </LayoutWebsite>
</div>
</div>
  )
}

export default changePassword