import React, {useState} from 'react';
import {UserOutlined, UnorderedListOutlined, FileZipOutlined, PictureOutlined, LockOutlined, WechatOutlined, PhoneOutlined} from '@ant-design/icons'
import {Button, Typography} from 'antd';

import styles from 'styles/sidebar.module.css'
import Link from 'next/link';
import { LogOut } from 'methods/user';
import { useStore } from 'StoreContext';
import { UseMout } from 'customerHook/UseMount';

const { Title } = Typography;
const Sidebar = () => {
   const {state: {user}} = useStore();
   const [isSSR, setIsSSR] = useState(true);
   const [openInfo, setOpenInfo] = useState(false);
   const [openCart, setOpentCart] = useState(false);
   const [openFile, setOpentFile] = useState(false);

   const onHandleCLickInfo = () => setOpenInfo(pre => !pre);
   const onHandleCLickCart = () => setOpentCart(pre => !pre);
   const onHandleCLickFile = () => setOpentFile(pre => !pre)

   UseMout(() => {
      setIsSSR(false);
   })

  return (
    <div style={{borderRight: '1px solid #F1F1F1'}}>
      <div className={styles.sidebarUser}>
          <div className={styles.userAvatar}></div>
          {
             !isSSR && (
               <div>
                  <h4 className={styles.userTitle}>{user?.fullname}</h4>
               </div>
             )
          }
      </div>
      <div className='cartContent'>
         <ul className={styles.sidebar_cat__list}>
            <li className='parents' onClick={onHandleCLickInfo}>
               <a><UserOutlined style={{marginLeft: 4}}/><span className={styles.textMenu}>Thông tin</span></a>
               <ul className={openInfo ? styles.childsBlock : styles.childs}>
                  <li><Link href={'/customer'}>Thông tin chung</Link></li>
                  <li><Link href={'/customer/pay'}>Thông tin thanh toán</Link></li>
               </ul>
            </li>  
            <li className='parents'>
               <Link href={'/customer-order/my-order'}>
               <a><UnorderedListOutlined style={{marginLeft: 4}}/>
               <span className={styles.textMenu}>Quản lý đơn hàng</span>
               {
                     !isSSR && (
                        <span className={styles.themeColor_primary_background}>{user?.numOfOrder || 0}</span>
                     )
               }
               </a>
               </Link>
               
               {/* <ul className={openCart ? styles.childsBlock : styles.childs}>
                  <li><Link href={'/'}><a>Chờ thanh toán <span className={styles.background_sup4}>0</span></a></Link></li>
                  <li><Link href={'/'}><a>Đang xử lý <span className={styles.background_sup1}>0</span></a></Link></li>
                  <li><Link href={'/'}><a>Hoàn thành <span className={styles.background_sup2}>0</span></a></Link></li>
                  <li><Link href={'/'}><a>Từ chối <span className={styles.background_sup4}>0</span></a></Link></li>
               </ul>  */}
            </li>  
            {/* <li className='parents' onClick={onHandleCLickFile}>
               <a><FileZipOutlined style={{marginLeft: 4}}/><span className={styles.textMenu}>File của tôi</span></a>
               <ul className={openFile ? styles.childsBlock : styles.childs}>
                  <li><Link href={'/'}>File thư viện</Link></li>
                  <li><Link href={'/'}>File chốt in</Link></li>
               </ul>
            </li>  
            <li><Link href={'/'}><a><PictureOutlined style={{marginLeft: 4}}/><span className={styles.textMenu}>Bộ sưu tập</span></a></Link></li>   */}
            <li><Link href={'/customer/change-password'}><a><LockOutlined style={{marginLeft: 4}}/><span className={styles.textMenu}>Đổi mật khẩu</span></a></Link></li>  
            <li onClick={LogOut}><Link href={'/'}><a><span className={styles.textMenu} style={{paddingLeft: 18}}>Đăng xuất</span></a></Link></li>  
         </ul>
      </div>
      <hr/>
      <div className={styles.qaEnduser}>
            <Title level={3}>tư vấn và hỏi đáp</Title>
            <div className={styles.textCenter}>
            <Button type='primary' className={styles.btnButton}><WechatOutlined style={{fontSize: 18}}/>CHAT NGAY</Button>  
            <br/>  
            <Button type='primary' className={styles.btnButtonYeslown}><PhoneOutlined style={{fontSize: 18, color: '#000'}}/>1900.633313</Button>    
            </div>
      </div>
    </div>
  )
}

export default Sidebar