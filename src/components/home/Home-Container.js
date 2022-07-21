import RequestUtils from 'libs/RequestUtils';
import dynamic from 'next/dynamic';
import Head from 'next/head'
import React from 'react'


const DynamicSlider = dynamic(() => import('./Slide'));
const DynamicProductPrint = dynamic(() => import('./ProductPrint'));
const DynamicProductDesign = dynamic(() => import('./ProductDesign'));
const DynamicProductFeature = dynamic(() => import('./ProductFeature'));
const DynamicBusiness = dynamic(() => import('./FieldBusiness'));
const DynamicReviewCompany = dynamic(() => import('./ReviewCompany'));
const DynamicNewsPrintgo = dynamic(() => import('./NewPrintgo'));
const HomeContainer = (props) => {

  const title = 'Printgo - Nền tảng Thiết kế và In ấn số 1 Việt Nam';
  const image = 'https://printgo.vn/uploads/config/0/3f5be3089d59a67b93c5d9f20d4221f7.png';
  const description = 'Sứ mệnh tiên phong Số hoá ngành Thiết kế và In ấn. Dùng công nghệ để Tối ưu chi phí,' +
  'Thuận tiện cho khách hàng. Sản phẩm cung cấp: Bao bì, Hộp carton, Túi giấy, Tờ rơi, Namecard...';

  const {pageProps: { banners, designs, prints }} = props;
 
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta name="og:site_name" content='printgo'/>
        <meta name="og:type" content='website'/>
        <meta name="og:url" content='https://printgo.vn/'/>
        <meta name="og:description" content={description} />
        <meta name="og:image" content={image}/>
        <meta name="og:image:secure_url" content={image} />
        <meta name="fb:app_id " content="302192783996643"/>
        <link href="https://printgo.vn" rel="canonical" />
      </Head>
      <div style={{minHeight: '100vh'}}>
        <DynamicSlider data={banners}/>
        <DynamicProductPrint data={prints}/>
        <DynamicProductDesign data={designs}/>
        <DynamicProductFeature/>
        <DynamicBusiness/>
        <DynamicReviewCompany/>
        <DynamicNewsPrintgo/>
      </div>
    </div>
  )
}

HomeContainer.getInitialProps = async () => {
  const [banners, designs, prints] = await Promise.all([
    RequestUtils.GetWeb('menu/banner', null, []),
    RequestUtils.GetWeb('menu/design-package', null, []),
    RequestUtils.GetWeb('menu/prints', null, [])
  ]);
  return {banners, designs, prints}
}

export default HomeContainer