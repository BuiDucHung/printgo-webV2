import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import RequestUtils from 'libs/RequestUtils'
import {withRouter} from 'next/router';
import { NextPage } from 'next';

import NoResult from 'components/common/Noresult';
import IBreadcrumb from 'components/Breadcrumb'
import FirtCombo from 'components/category/FirtCombo';

const fetchCate = async(id: number) => {
  let combos = [];
  const category = await RequestUtils.GetWeb(`/search?chuyenmuc=${id}`);
  if(category?.cm?.code) {
    combos = await RequestUtils.openPrice(`/combo-print/list?code=${category.cm.code}`);
  }
  return {category, combos}
}

type PageProps = {
  id: number,
  datestr: string,
  desc: string,
  imageSrc: string,
  name: string,
  title: string,
  url: string,
  view: number
}

interface CateProps {
  cm: null,
  faqs: [],
  jsond: null,
  pages: PageProps[],
  products: any | undefined
}

interface CategoryProps {
  category?: CateProps,
  combos?: [],
  router?: any
}


const Category: NextPage<CategoryProps> = (props: any) => {
  
  const { category, combos: cbs } = props.pageProps;
  const { id } = props.router.query;
  const { cm, faqs, products } = category;
  const [ model, setModel ] = useState(cm || {});
  const [ combos, setCombos ] = useState(cbs.embedded || []);
  const [ listFaq, setFaqs ] = useState(faqs || []);
  const [ modelProduct, setModelProduct ] = useState(products|| {});
  
  useEffect(() => {
      fetchCate(id).then(({category, combos: {embedded}}) => {
       const {cm: clientCm, faqs: clientFaq, products: clientProduct} = category;
       setModel(clientCm);
       setCombos(embedded);
       setFaqs(clientFaq || []);
       setModelProduct(clientProduct || {});
      })
  },[])

  return !model ? <NoResult subTitle={'Chưa có kết quả hiển thị'}/> :
    <div className='container'>
      <Head>
          <title>{model.title}</title>
          <meta name="description" content={model?.desc} />
          <meta property="og:title" content={model?.title} />
          <meta name="og:site_name" content='printgo'/>
          <meta name="og:type" content='website'/>
          <meta name="og:url" content={model?.canonical}/>
          <meta name="og:description" content={model?.desc} />
          <meta name="fb:app_id" content="302192783996643"/>
          <meta name="og:image" content={model?.image} />
          <meta name="og:image:secure_url" content={model?.image}/>
          <link href={model?.canonical || '/'} rel="canonical" />
      </Head>
      <IBreadcrumb title={'Danh mục sản phẩm'} name={model?.name}/>
      <div>
        <FirtCombo datas={combos}/>
      </div>
    </div>
  
}

Category.getInitialProps = async ({ query: {c}}:never) => {
  return fetchCate(c);
}

export default withRouter(Category)