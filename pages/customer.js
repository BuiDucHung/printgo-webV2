import React from 'react'

import UserInfo from 'components/user/UserInfo'
import LayoutWebsite from 'components/layoutUser/Website'
import Head from 'next/head'
import IBreadcrumb from 'components/Breadcrumb'

const Customer = () => {
  return (
    <>
    <Head>
       <title>Thông tin chung</title>
    </Head>
    <div className='container'>
         <IBreadcrumb title={'Thông tin chung'}/>
         <LayoutWebsite titleSub={'THÔNG TIN CHUNG'}>
             <UserInfo/>
         </LayoutWebsite>
    </div>
    </>
  )
}

export default Customer