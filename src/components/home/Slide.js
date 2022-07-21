import { Carousel } from 'antd'
import Link from 'next/link';
import React from 'react'

const contentStyle = {
    minHeight: '480px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };
const Slider = ({data}) => {

  return (
    <div style={{zIndex: 1}}>

        <Carousel >
            {
              data.map((item, i) => (
                <div key={i}>
                <Link href={item.url} target="_blank">
                    <img src={`https://printgo.vn/uploads/banners/0/${item.image}`}
                    alt={item.title}
                    style={{width: '100%', height: '100%', cursor: 'pointer', verticalAlign: 'top', objectFit: 'cover'}}
                    />
                </Link>
                </div>
              ))
            }
        </Carousel>
    </div>
  )
}

export default Slider