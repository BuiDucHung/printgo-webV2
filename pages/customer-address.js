import Head from 'next/head'
import React from 'react'
import IBreadcrumb from 'components/Breadcrumb'
import ListAddress from 'components/user/ListAddress'
import LayoutWebsite from 'components/layoutUser/Website'

const customerAddress = () => {
  return (
    <div>
        <Head>
            <title>Sổ địa chỉ</title>
        </Head>
        <div className='container'>
        <IBreadcrumb title={'Sổ địa chỉ'}/>
        <LayoutWebsite titleSub={'SỔ ĐỊA CHỈ'}>
            <ListAddress/>
        </LayoutWebsite>
        </div>
    </div>
  )
}

export default customerAddress