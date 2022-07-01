import React from 'react'
import dynamic from 'next/dynamic';



const DynamicItemPrint = dynamic(() => import('./ItemPrint'));
const DynamicItemSignPrint = dynamic(() => import('./ItemDesignSign'));
const OrderDetail = ({order}) => {
  return (
    <div >
        {
            order.customerOrderDetail.map((item, key) => (
            item.orderType === 0 ? (
            <DynamicItemSignPrint key={key} detail={item} code={order.code} id={order.id} paid={order.paid} total={order.total}/> 

            )
            : <DynamicItemPrint key={key} detail={item} code={order.code} id={order.id} paid={order.paid} total={order.total}/>
            ))
        }
    </div>
  )
}

export default OrderDetail