import React from 'react'
import Head from 'next/head'

import LayoutWebsite from 'components/layoutUser/Website'
import IBreadcrumb from 'components/Breadcrumb'
import { ChangePass} from 'components/user/ResetPass'


const ResetPassword = () => {
 
  return (
    <div>
    <Head>
        <title>Đổi mật khẩu</title>
    </Head>
    <div className='container'>
    <IBreadcrumb title={'Reset Mật khẩu'}/>
     <LayoutWebsite titleSub={'RESET MẬT KHẨU'}>
        <ChangePass/>
     </LayoutWebsite>
</div>
</div>
  )
}

export default ResetPassword