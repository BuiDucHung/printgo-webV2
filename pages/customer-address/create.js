import Head from 'next/head'
import React from 'react'

import IBreadcrumb from 'components/Breadcrumb'
import CreateAddress from 'components/user/CreateAddress'
import LayoutWebsite from 'components/layoutUser/Website'


const Create = () => {
 
  return (
    <div>
      <Head>
        <title>Tạo mới địa chỉ</title>
      </Head>
      <div className='container'>
      <IBreadcrumb title={'Tạo mới địa chỉ'}/>
      <LayoutWebsite titleSub={'TẠO MỚI ĐỊA CHỈ'}>
         <CreateAddress/>
      </LayoutWebsite>
      </div>
    </div>
  )
}

export default Create