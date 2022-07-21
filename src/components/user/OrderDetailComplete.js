import React from 'react'
import dynamic from 'next/dynamic'


const DynamicItemPrint = dynamic(() => import('./ItemPrint'))
const DynamicItemDesign = dynamic(() => import('./Itemdesign'))

const OrderDetailComplete = ({order}) => {
  return (
    <div>
    { order.customerOrderDetail.map( (item, key) => (
      <div key={key}>
        {
          item?.orderType === 0 ? 
          <DynamicItemDesign key={key} enterpriseName={order.enterpriseName} detail={item} code={order.code} id={order.id} paid={order.paid} total={order.total}/>
          : 
          <DynamicItemPrint key={key} detail={item} code={order.code} id={order.id} paid={order.paid} total={order.total}/>
        }
      </div>
    ))}
  </div>
  )
}

export default OrderDetailComplete