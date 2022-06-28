import Head from 'next/head'
import React from 'react'

import IBreadcrumb from 'components/Breadcrumb'

import LayoutWebsite from 'components/layoutUser/Website'
import UpdateAddress from 'components/user/UpdateAddress'


const Update = () => {
 
  return (
    <div>
      <Head>
        <title>Tạo mới địa chỉ</title>
      </Head>
      <div className='container'>
      <IBreadcrumb title={'Sửa mới địa chỉ'}/>
      <LayoutWebsite titleSub={'SỬA MỚI ĐỊA CHỈ'}>
         <UpdateAddress/>
      </LayoutWebsite>
      </div>
    </div>
  )
}
// export async function getStaticPaths(id) {
//   return {
//     paths: [
//       { params: id.toString()},
//     ],
//     fallback: false,
//   };
// }

export default Update