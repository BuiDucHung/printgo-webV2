import React from 'react'
import dynamic from 'next/dynamic';



const DynamicItemPrint = dynamic(() => import('./ItemPrint'));
const DynamicItemSignPrint = dynamic(() => import('./ItemDesignSign'));
const OrderDetail = ({order}) => {
  return (
    <div >
        {
          
            order.customerOrderDetail.map((item, key) => (
            <div key={key}>

              {
                item.orderType === 0 ? (
                  <DynamicItemSignPrint key={item.id} detail={item} code={order.code} id={order.id} paid={order.paid} total={order.total}/> 
      
                  )
                : <DynamicItemPrint key={item.id} detail={item} code={order.code} id={order.id} paid={order.paid} total={order.total}/>
              }

            </div>))
        }
    </div>
  )
}

export default OrderDetail