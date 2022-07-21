import {Tabs } from 'antd';
import React from 'react'
import { CategoryProps } from './ProductFeature'

interface DataProps {
    category: CategoryProps[][],
    displays: boolean
}

const { TabPane } = Tabs;
const TabcateData: React.FC<DataProps> = ({category, displays}) => {
    
  return (
      <>
       {
        category[1]?.map((item, index) => (
            displays && <TabPane tab={item?.name} key={index}/>
        ))
       }
    </>   
  )
}

export default TabcateData