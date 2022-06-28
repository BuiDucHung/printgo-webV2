import App from 'next/app';
import '../public/css/style.css'
import {withRouter} from 'next/router';
import Head from 'next/head'
import LayoutMain from 'components/LayoutMain';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { StoreProvider } from 'StoreContext';

function MyApp({ Component, pageProps }) {
  return <>
      <Head>
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="mobile-web-app-capable" content="yes" />
      <link rel="shortcut icon" href="https://printgo.vn/img/icon/fabi.png" />
      <link rel="bookmark" href="https://printgo.vn/img/icon/fabi.png" />

      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700&display=swap" rel="stylesheet" />

      <link rel="preload" media="print" href="https://fonts.googleapis.com/css?family=Montserrat:300,300i,400,400i&display=swap" as="style" />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
      
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "url": "https://printgo.vn",
          "logo": "https://printgo.vn/img/logo.png"})
        }}
      />
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "url": "https://printgo.vn",
          "contactPoint": [
            { "@type": "ContactPoint", "telephone": "1900.633313", "contactType": "customer service"}
          ]})
        }}
      />
    </Head>

    <StoreProvider>
    <LayoutMain>
      <Component pageProps={pageProps}/>
    </LayoutMain>
    </StoreProvider>
  
  </>  
}

export default withRouter(MyApp); 
