import React from 'react'
import {Tabs } from 'antd';
import { CategoryProps } from './ProductFeature'

interface DataProps {
    category: CategoryProps[][]
}

const { TabPane } = Tabs;
export const TabcateDataLeft: React.FC<DataProps> = ({category}) => {
  return (
    <>
          {
              category[0]?.map((item, index) => (
                <TabPane tab={item?.name} key={index + 1}/>
              ))
          }
    </>
  )
}
