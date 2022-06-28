import { Button, Space, Table, Tag } from 'antd'
import Link from 'next/link'
import React from 'react'

import styles from 'styles/listAddress.module.css'


const columns = [
    {
      title: 'Tên người nhận',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Điện thoại',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
  
            if (tag === 'loser') {
              color = 'volcano';
            }
  
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Mặc định',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a>Sửa</a>
          <a>Xóa</a>
        </Space>
      ),
    },
  ];
  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];

const ListAddress = () => {
  return (
      <div>
        <div className={styles.panelHeading}>
        <p style={{height: 15, textTransform: 'uppercase' , lineHeight: '30px', fontWeight: 'bold'}}>Quản lý địa chỉ</p>
        <Button className={styles.btnSuccess}><Link href={'/customer-address/create'}>Tạo mới</Link></Button>
        </div>
        <Table pagination={false} columns={columns} dataSource={data}/>
      </div>
  )
}

export default ListAddress