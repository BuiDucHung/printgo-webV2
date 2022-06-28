import React from 'react'
import {CaretDownOutlined} from '@ant-design/icons'
import Link from 'next/link';

const MenuNavBar = () => {
  return (
    <div className='main-navbar'>
      <ul className='list-level-01 list-unstyled'>
        <li className='parent'><a>LĨNH VỰC</a><CaretDownOutlined style={{marginLeft: 5, color: '#fff'}}/>
          <ul className='child'>
            <li><Link href={'/'}><a><img src='https://printgo.vn/uploads/menus/x804cff0c9674c6c00fb0.jpg.pagespeed.ic.C8aASnbo2s.webp'/>  Kinh doanh</a></Link></li>
            <li><Link href={'/'}><a><img src='https://printgo.vn/uploads/menus/x19c10bfb842e41bc28b0.jpg.pagespeed.ic.pO_5NY0NQz.webp'/> Nhà hàng</a></Link></li>
            <li><Link href={'/'}><a><img src='https://printgo.vn/uploads/menus/x2a548d2e79aefec74cd0.jpg.pagespeed.ic.eou6Btthjc.webp'/> Du lịch</a></Link></li>
            <li><Link href={'/'}><a><img src='https://printgo.vn/uploads/menus/xe6f4ecbc10e104cf2c8b.jpg.pagespeed.ic.Sw8kij1Hjn.webp'/> Thời trang</a></Link></li>
            <li><Link href={'/'}><a><img src='https://printgo.vn/uploads/menus/xb08e7bfb46c808a87de8.jpg.pagespeed.ic.GleJgsl94d.webp'/> Sự kiện</a></Link></li>
            <li><Link href={'/'}><a><img src='https://printgo.vn/uploads/menus/x6a07b76a71f08179fd52.png.pagespeed.ic.0sT8sNZLm2.webp'/> Cá nhân</a></Link></li>
          </ul>
        </li>
        <li className='parent'><a>THIẾT KẾ</a><CaretDownOutlined style={{marginLeft: 5, color: '#fff'}}/>
          <ul className='child'>
          <li><Link href={'/'}><a><img src='https://printgo.vn/uploads/menus/xa48e46ac948a01269e02.png.pagespeed.ic.YsIh11ZJ7F.webp'/> Gói thiết kế</a></Link></li>
            <li><Link href={'/'}><a><img src='https://printgo.vn/uploads/menus/xea01da705072d1070c0a.png.pagespeed.ic.HxZ3nfy_iK.webp'/>Sản phẩm thiết kế</a></Link></li>
            <li><Link href={'/'}><a><img src='https://printgo.vn/uploads/menus/x64c0c3ffe1c6cc4ab48d.png.pagespeed.ic.aTCgKKH4Z5.webp'/>Đăng ký đối tác</a></Link></li>
          </ul>
        </li>
        <li className='parent'><a>DỰ ÁN</a><CaretDownOutlined style={{marginLeft: 5, color: '#fff'}}/>
          <ul className='child'>
          <li><Link href={'/'}><a><img src='https://printgo.vn/uploads/menus/x804cff0c9674c6c00fb0.jpg.pagespeed.ic.C8aASnbo2s.webp'/>  Kinh doanh</a></Link></li>
            <li><Link href={'/'}><a><img src='https://printgo.vn/uploads/menus/x804cff0c9674c6c00fb0.jpg.pagespeed.ic.C8aASnbo2s.webp'/> Nhà hàng</a></Link></li>
            <li><Link href='/'><a><img src='https://printgo.vn/uploads/menus/x804cff0c9674c6c00fb0.jpg.pagespeed.ic.C8aASnbo2s.webp'/> Du lịch</a></Link></li>
            <li><Link href={'/'}><a><img src='https://printgo.vn/uploads/menus/x804cff0c9674c6c00fb0.jpg.pagespeed.ic.C8aASnbo2s.webp'/> Thời trang</a></Link></li>
            <li><Link href={'/'}><a><img src='https://printgo.vn/uploads/menus/x804cff0c9674c6c00fb0.jpg.pagespeed.ic.C8aASnbo2s.webp'/> Sự kiện</a></Link></li>
            <li><Link href={'/'}><a><img src='https://printgo.vn/uploads/menus/x804cff0c9674c6c00fb0.jpg.pagespeed.ic.C8aASnbo2s.webp'/> Cá nhân</a></Link></li>
          </ul>
        </li>
        <li className='parent'><a>TIN TỨC</a><CaretDownOutlined style={{marginLeft: 5, color: '#fff'}}/>
          <ul className='child'>
            <li><Link href={'/'}><a><img src='https://printgo.vn/uploads/menus/x804cff0c9674c6c00fb0.jpg.pagespeed.ic.C8aASnbo2s.webp'/>  Kinh doanh</a></Link></li>
            <li><Link href={'/'}><a><img src='https://printgo.vn/uploads/menus/x804cff0c9674c6c00fb0.jpg.pagespeed.ic.C8aASnbo2s.webp'/> Nhà hàng</a></Link></li>
            <li><Link href={'/'}><a><img src='https://printgo.vn/uploads/menus/x804cff0c9674c6c00fb0.jpg.pagespeed.ic.C8aASnbo2s.webp'/> Du lịch</a></Link></li>
            <li><Link href={'/'}><a><img src='https://printgo.vn/uploads/menus/x804cff0c9674c6c00fb0.jpg.pagespeed.ic.C8aASnbo2s.webp'/> Thời trang</a></Link></li>
            <li><Link href={'/'}><a><img src='https://printgo.vn/uploads/menus/x804cff0c9674c6c00fb0.jpg.pagespeed.ic.C8aASnbo2s.webp'/> Sự kiện</a></Link></li>
            <li><Link href={'/'}><a><img src='https://printgo.vn/uploads/menus/x804cff0c9674c6c00fb0.jpg.pagespeed.ic.C8aASnbo2s.webp'/> Cá nhân</a></Link></li>
          </ul>
        </li>
      </ul>
    </div>
  )
}

export default MenuNavBar