import React, {useEffect, useState} from 'react';
import {Typography } from 'antd';


import styles from 'styles/home.module.scss';
import CustomeIcon from 'utils/CustomeIcon';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 


const {Title, Text} = Typography;

const SampleNextArrow = (props) => {
  const { className,onClick } = props;
  return (
    <div
      className={className}
      style={{cursor: 'pointer'}}
      onClick={onClick}>
        <img src='https://printgo.vn/img/icon/xnex.png.pagespeed.ic.8R0KyGzAt2.webp'/>
      </div>
  );
}

const SamplePrevArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div
      className={className}
      style={{cursor: 'pointer'}}
      onClick={onClick}>
        <img src='https://printgo.vn/img/icon/xpew.png.pagespeed.ic.vkXl1ZKT5_.webp'/>
      </div>
  );
}
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SampleNextArrow />,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          dots: false
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false
        }
      }
    ]
  };


const ProductDesign = ({data}) => {

  return (
    <div className='container'>
        <div className={styles.center}>
            <Text className={styles.text}>Lựa chọn gói thiết kế phù hợp với nhu cầu của bạn</Text>
            <Title level={4} className={styles.subTitle}>Sàn thiết kế trực tuyến</Title>
            <div className={styles.number}></div>
        </div>
        <Slider {...settings}>
          {
            data.package?.map((item , idex) => (
              <div className={styles.mtLeft} key={idex}>
              <CustomeIcon type={`https://printgo.vn/uploads/media/${item.image}`} style={{width: '100%',  height: 245}}/>
               <Title level={4} style={{paddingTop: 10 , color: '#2A63C7'}}><div style={{textTransform: 'uppercase'}}>Thiết kế </div>{item.name}</Title>
                <div style={{background: 'orange', color: 'white' , width: '60%', borderRadius: 50, textAlign: 'center', marginBottom: 20}}>{item.buy_number} sản phẩm đã thiết kế</div>
                <Text style={{width: 50}}>{item.title}</Text>
                <div className={styles.btt}></div>
              </div>
            ))
          }
        </Slider>
    </div>
  )
}

export default ProductDesign