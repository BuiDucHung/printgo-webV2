import {Table} from 'antd';

import React from 'react'

const columns = [
    {
      title: 'STT',
      dataIndex: 'id',
      key: 'id',
      innerWidth: '5%',
      onHeaderCell: () => ({
        style: {
          backgroundColor:  'var(--colorPrimary)',
          color: 'var(--white)'
        }
      })
    },
    {
      title: 'Nội dung',
      dataIndex: 'content',
      key: 'content',
      onHeaderCell: () => ({
        style: {
          backgroundColor:  'var(--colorPrimary)',
          color: 'var(--white)',
          textAlign: 'center',
        }
      })
    },
    {
      title: 'S/L',
      dataIndex: 'quantity',
      key: 'quantity',
      onHeaderCell: () => ({
        style: {
          backgroundColor:  'var(--colorPrimary)',
          color: 'var(--white)',
        }
      })
    },
    {
      title: 'Đơn giá',
      dataIndex: 'price',
      key: 'price',
      dataIndex: 'price',
      onHeaderCell: () => ({
        style: {
          backgroundColor:  'var(--colorPrimary)',
          color: 'var(--white)',
        }
      })
    },
    {
        title: 'Thành tiền',
        dataIndex: 'total',
        key: 'total',
        dataIndex: 'total',
        onHeaderCell: () => ({
            style: {
              backgroundColor:  'var(--colorPrimary)',
              color: 'var(--white)',
            }
          })
      },

  ];
 
const DetaiOrderComplete = ({detail}) => {
  
   const data = [
    {
      id: detail.detailDesign.id,
      content: detail.detailDesign.noidung,
      quantity: detail.detailDesign.numberCase,
      price: detail.detailDesign.designFee,
      total: detail.detailDesign.designFee,
    },
  ];

  return (
    <div>
        <Table pagination={false} columns={columns} dataSource={data} />
    </div>
  )
}

export default DetaiOrderComplete