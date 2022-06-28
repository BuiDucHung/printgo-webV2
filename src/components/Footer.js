import { Col, Form, Input, Row, Typography } from 'antd'
import React from 'react'
import {MailOutlined} from '@ant-design/icons'

import { textCopyright, titleSub, imageLogo, imageIcon, aboutPrintgo } from '../../data';

const { Title } = Typography;

 const Footer = () => {

  return (
    <div className='siteFooter'>
      <section className='footer-promotion'>
        <div className='container'>
          <Row>
            {
              titleSub.map((item, id) => (
              <Col span={6} key={id}>
                <div className='single-policy'>
                  <img src={item.image} /> 
                  <div className='policy-descr'>
                   <Title level={5} style={{color: '#fff', fontSize: 14, marginBottom: 0}}>{item.title}</Title>
                  <div style={{fontSize: 12}}>{item.titleSub}</div>
                  </div>
                </div>
              </Col>
              ))
            }
          </Row>
        </div>
      </section>
      <section className='footer-pri'>
        <div className='footer-main' >
        <div className='container'>
          <div className='registerEmail'>
              <Title level={2} style={{color: '#fff', textTransform: 'uppercase' , fontSize: '25px', fontWeight: 'bold' , lineHeight: '30px', paddingBottom: '15px', display: 'block'}}>
                Nhập địa chỉ email của bạn để nhận ngay 50.000 VNĐ
              </Title>
            <Form style={{marginTop: 45}}>
               <Input className='input_item' required placeholder="Email của bạn..."/>
               <button className='sub-mail' type='submit'><MailOutlined style={{fontSize: '18px', paddingRight: '8px'}}/>đăng kí</button> 
            </Form>
            <Row style={{marginTop: '8%'}}>
                <Col span={6} className="footer-lastchild">
                  <Title level={5} className="nav-title">CHĂM SÓC KHÁCH HÀNG</Title>
                  <ul>
                    <li className='nav-list'><a href='tel:1900633313' style={{color: '#a1acb6', fontSize: '13px'}}>
                      Hotline:<span className='gold'> 1900.633313</span></a></li>
                    <li className='nav-list'><a href='tel:0901633313' style={{color: '#a1acb6', fontSize: '13px'}}>
                      CSKH:<span className='gold'> 0901.633.313</span></a></li>
                    <li className='nav-list'><a href='mailto:sale@printgo.vn' style={{color: '#a1acb6', fontSize: '13px'}}>
                      Email:<span className='green'> sale@printgo.vn</span></a></li>
                    <li className='nav-list'><a href='/' style={{color: '#a1acb6', fontSize: '13px'}}>
                      Hướng dẫn in ấn</a></li>
                    <li className='nav-list'><a href='/' style={{color: '#a1acb6', fontSize: '13px'}}>
                      Hướng dẫn thanh toán</a></li>
                  </ul>
                </Col>
                <Col span={6} className="footer-lastchild">
                <Title level={5} className="nav-title">VỀ PRINTGO</Title>
                  <ul>
                    {
                      aboutPrintgo.map((item, id) => (
                      <li key={id} className='nav-list'><a href='/' style={{color: '#a1acb6', fontSize: '13px'}}>{item.text}</a></li>
                      ))
                    }
                  </ul>
                </Col>
                <Col span={6} className="footer-lastchild">
                <Title level={5} className="nav-title">HỢP TÁC</Title>
                <Row gutter={{ md: 16 }} style={{marginLeft: 15, marginRight: 15, marginTop: 20}}>
                {
                    imageLogo.map((item, id) => (
                        <Col span={12} key={id}>
                            <img src={item.logo} width={100} height={54} />
                      </Col>
                    ))
                  }
                </Row>
                </Col>
                <Col span={6} >
                <Title level={5} className="nav-title">THEO DÕI PRINTGO</Title>
                <div className='icon-Image'>
                  {
                    imageIcon.map((item, id) => (
                    <img key={id} src={item.icon} className='img'/>
                    ))
                  }
                </div>
                <div className='icon-Image'>
                  <img src='https://images.dmca.com/Badges/_dmca_premi_badge_2.png?ID=b027c33e-eda0-4340-b98f-8d5ae49b1b1d' style={{marginTop: '20px'}} width={55} height={60}/>
                </div>
                </Col>
              </Row>
          </div>
          </div>
      </div>
      <div className='copyright'>
      <div className='container '>
          <Row>
            <Col span={17}>
              <div>
                {
                  textCopyright.map((item, id) => (
                  <p style={{fontSize: '13px'}} key={id}><span className='gold'>{item.text} </span>{item.address}</p>
                  ))
                }
              </div>
            </Col>
            <Col span={7}>
              <div className='notificate'>
              <img width={180} height={68} src='https://printgo.vn/img/180xNxlogoSaleNoti.png.pagespeed.ic.SL803TJ3j9.png'/>
              </div>
            </Col>
          </Row>
      </div>
      </div>
      </section>
    </div>
  )
}

export default Footer