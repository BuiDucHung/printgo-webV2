import React, {useState} from 'react'
import { Button, Col,Form,Input,Row, Typography } from 'antd';
import Link from 'next/link';
import {MenuOutlined, ShoppingCartOutlined, UserOutlined, PrinterOutlined, SearchOutlined, LockOutlined} from '@ant-design/icons';
import { useRouter } from 'next/router';

import MenuNavBar from './MenuNav';
import { ModalLogin } from './auth/ModalLogin';
import { useStore } from 'StoreContext';
import { LogOut } from 'methods/user';
import { UseMout } from 'customerHook/UseMount';
import styles from 'styles/header.module.scss';



const { Title } = Typography;
const Header = () => {
  const {state: {user}} = useStore();
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [isSSR, setIsSSR] = useState(true);

  const showModal = () => {
    setVisible(true);
  };
 
  const handleLink = () => {
    return router.push('/customer/info');
  }

  UseMout(() => {
    setIsSSR(false);
  })
 
  return (
      <div>
        <header className={styles.siteHeader}>
        <section className={styles.main_menu}>
        <div className='container'>
          <div className={styles.main_menu__wrapper}>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{marginLeft: 0, marginRight: 0}}>
            <Col span={7}>
                <div className='sh_logo' style={{cursor: 'pointer'}}>
                    <Link href={'/'}>
                      <img src="https://printgo.vn/img/logo.png" width={132} height={45}/>
                    </Link>
                </div>
            </Col>
            <Col span={17} >
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col span={15} style={{paddingLeft: 0}}>
                <Form className={styles.search_bar}>
                  <Input className={styles.input_group} required placeholder="Tìm kiếm sản phẩm Mã đơn hàng..."/>
                  <Button className={styles.search_button} type='submit'><SearchOutlined style={{fontSize: 14}}/> Tìm kiếm</Button> 
                </Form>
              </Col>
              <Col span={4} style={{paddingLeft: 0, paddingRight: 0}}>
              <Row >
                {
                  !isSSR && (
                    <Col span={19}>
                  {
                    user?.email ? (
                    <div className={styles.authent} style={{cursor: 'pointer'}}>
                      <Title className="hoverMenu" level={5} style={{display: 'flex', gap: 10, alignItems: 'baseline', padding: '5px', fontSize: '14px', width: 110}}>
                      <LockOutlined />
                        <p>{user?.email.substring(0,11)}...</p>
                      </Title>
                      <ul className={styles.navAuth}>
                        <li style={{borderBottom:'0.5px dotted #cdcdcd', paddingRight: 20}} onClick={handleLink}>
                          <a style={{fontSize: 12}}> <UserOutlined style={{fontSize: 12}}/> Tài khoản</a>
                        </li>
                        <li style={{fontSize: 12}} onClick={LogOut}><Link href={'/'}><a href='/'>Đăng xuất</a></Link></li>
                      </ul>
                    </div> 
                    )
                    : (
                    <div style={{cursor: 'pointer'}} onClick={showModal}>
                      <Title level={5} style={{display: 'flex', gap: 10, alignItems: 'center', padding: '5px', fontSize: '14px', width: 110}}>
                      <LockOutlined />
                        Đăng nhập
                      </Title>
                    </div>
                    )
                  }
                </Col>
                  )
                }
                <Col span={5} style={{justifyContent: 'flex-end'}}>
                  <a type='submit' className={styles.menu_telephone}> 1900.633313</a>
                </Col>
              </Row>
              </Col>
                </Row>
            </Col>
            </Row>
          </div>
        </div>
    </section>
    <section className={styles.main_category}>
      <div className='container'>
          <Row>
            <Col span={7}>
            <div className={styles.category}>
              <Row>
                  <Col span={4} style={{padding: 12}}>
                  <MenuOutlined style={{fontSize: '16px'}}/>
                  </Col>
                  <Col span={19} style={{paddingTop: 12}}>
                  <Title level={5} >Danh mục sản phẩm</Title>
                  </Col>
              </Row>
            </div>
            <div className='container'>
              <div className={styles.cate}>
              <ul className='cate_gory' style={{color: 'black'}}>
              <li><Link href={'/'}><a className={styles.bt}><img src={'https://printgo.vn/uploads/menus/x804cff0c9674c6c00fb0.jpg.pagespeed.ic.C8aASnbo2s.webp'}/>Hộp giấy</a></Link></li>
              <li><Link href={'/'}><a className={styles.bt}><img src={'https://printgo.vn/uploads/menus/x804cff0c9674c6c00fb0.jpg.pagespeed.ic.C8aASnbo2s.webp'}/>Hộp yến</a></Link></li>
              <li><Link href={'/'}><a className={styles.bt}><img src={'https://printgo.vn/uploads/menus/x804cff0c9674c6c00fb0.jpg.pagespeed.ic.C8aASnbo2s.webp'}/>Hộp bánh trung thu</a></Link></li>
              <li><Link href={'/'}><a className={styles.bt}><img src={'https://printgo.vn/uploads/menus/x804cff0c9674c6c00fb0.jpg.pagespeed.ic.C8aASnbo2s.webp'}/>In hộp rượu</a></Link></li>
              <li><Link href={'/'}><a className={styles.bt}><img src={'https://printgo.vn/uploads/menus/x804cff0c9674c6c00fb0.jpg.pagespeed.ic.C8aASnbo2s.webp'}/>Hộp gỗ </a></Link></li>
              <li><Link href={'/'}><a className={styles.bt}><img src={'https://printgo.vn/uploads/menus/x804cff0c9674c6c00fb0.jpg.pagespeed.ic.C8aASnbo2s.webp'}/>Tui giấy</a></Link></li>
              <li><Link href={'/'}><a className={styles.bt}><img src={'https://printgo.vn/uploads/menus/x804cff0c9674c6c00fb0.jpg.pagespeed.ic.C8aASnbo2s.webp'}/>Catalogue</a></Link></li>
              <li><Link href={'/'}><a className={styles.bt}><img src={'https://printgo.vn/uploads/menus/x804cff0c9674c6c00fb0.jpg.pagespeed.ic.C8aASnbo2s.webp'}/>Tem nhãn - Decal</a></Link></li>
              <li><Link href={'/'}><a className={styles.bt}><img src={'https://printgo.vn/uploads/menus/x804cff0c9674c6c00fb0.jpg.pagespeed.ic.C8aASnbo2s.webp'}/>Name card</a></Link></li>
              <li><Link href={'/'}><a className={styles.bt}><img src={'https://printgo.vn/uploads/menus/x804cff0c9674c6c00fb0.jpg.pagespeed.ic.C8aASnbo2s.webp'}/>Số da</a></Link></li>
              <li><Link href={'/'}><a className={styles.bt}><img src={'https://printgo.vn/uploads/menus/x804cff0c9674c6c00fb0.jpg.pagespeed.ic.C8aASnbo2s.webp'}/>Standee</a></Link></li>
              <li style={{display: 'flex', fontWeight: 'bold', textTransform: 'uppercase' , background: '#fff7d5', padding: 7, marginTop: 10 , justifyContent: 'center'}}><Link href={'/'}><a>Xem tất cả <img src={'img/download.png'}/></a></Link></li>  
            </ul>
              </div>
              </div>
            </Col>
            <Col span={17}>
          <Row>
              <Col span={15}>
                <MenuNavBar/>
              </Col>
              <Col span={4}>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{flexFlow: 'nowrap'}}>
                <Col span={19}>
                    <div className={styles.cart_tab}>
                    <ShoppingCartOutlined style={{ fontSize: 18}}/> 
                    giỏ hàng
                    </div>
                </Col>
                <Col span={5}>
                <div className={styles.print_tab}>
                  <PrinterOutlined style={{ fontSize: 18}}/>
                  in ngay
                </div>
                </Col>
                </Row>
              </Col>
          </Row>
        </Col>
        </Row>
      </div>
      </section>
    </header>  
    {visible && <ModalLogin visible={visible} setVisible={setVisible}/>}
</div>
  )
}

export default Header