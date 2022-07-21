import React, {useState, useEffect} from 'react';
import { Col, Row, Typography } from 'antd';

import styles from 'styles/home.module.scss';
import CustomeIcon from 'utils/CustomeIcon';
import { GeneratorGrid, GeneratorPrints } from 'methods/Data';
import { LinkCate } from '../../utils';
import Link from 'next/link';

const colStyles = {
    flexBasis: "20%",
    width: "20%",
    marginTop: "4%"
};


const tranFormIcon = icon => icon === '/img/icon/1.png' ? 'img/22.jpeg' : icon;
const {Text, Title} = Typography;
const ProductPrint = ({data}) => {
    const [allCate, showAllCate] = useState(false);
    const [rItems, setRItems] = useState([]);
    const [itemsGrid, setItemsGrid] = useState([]);
    const toogleCate = () => showAllCate(pre => !pre)


    useEffect( () => {
        setRItems(GeneratorPrints(data))
        setTimeout( () => {
          setItemsGrid(GeneratorGrid(data))
        }, 1000)
      }, [data]);
 
      return (
    <div className='container'>
        <div style={{marginBottom: 50}}>
        <Row type="flex" gutter={[16]} style={{marginLeft: 6, marginRight: 6}}>
            <Col style={{ ...colStyles }}>
            <div >
                <Title level={5} style={{fontSize: 18, margin: 0}}>In ấn dễ dàng cùng</Title>
                <Text style={{color: '#3dbeb3', fontWeight: 'bold', fontSize: 30}}>Printgo</Text>
                <Text style={{display: 'flex', justifyContent:'center', alignItems: 'center'}}>Lorem Ipsum is simply dummy
                text of the printing and typeset-ting
                ting indutry Lorem Isump has been the industry's... 
                </Text>
            </div>
            </Col>
           {
               allCate ? ( itemsGrid.map((product, index) => (                         
                <ItemPrint key={index} toogleCate={toogleCate} dataItem={product}/> ))
               ) : (
                rItems[0]?.map((product, index) => (
                <ItemPrint key={index} toogleCate={toogleCate}  dataItem={product}/>
            )))
           }
        </Row>
        </div>
    </div>
  )
}


const ItemPrint = ({dataItem, toogleCate}) => (

        dataItem.map((item, id) => (
            <Col style={{...colStyles}} key={id}>
            <div className={styles.boxStyle} style={{border: item.border ? '1px solid #000' : 'none'}}>
            { item.border ? (
            <div onClick={toogleCate} >
            <CustomeIcon type={tranFormIcon(item.icon)} style={{ width: '40px', height: '40px', margin: 'auto' , display: 'block' }}/> <br/> 
            {item.name}
            </div>
            ) : (
            <CustomeLink data={item}>
               <div>
                <CustomeIcon type={tranFormIcon(item.icon)} style={{ width: '40px', height: '40px', margin: 'auto' , display: 'block' }}/> <br/> 
                {item.name}
             </div>
            </CustomeLink>
            )} 
            </div>
            </Col>  
        ))      
)

const CustomeLink = ({data}) => {
    const myItem = Object.assign({}, data);
    if(myItem?.cateId) {
      myItem.id = myItem.cateId;
    }
    return myItem?.cateId ? (
      <LinkCate item={myItem} >
        <CustomeIcon type={tranFormIcon(data.icon)} style={{ width: '40px', height: '40px' , margin: 'auto' , display: 'block'  }}/><br/>
        {data.name}
      </LinkCate>
    ) : (
      <a href={data.href}>
          <CustomeIcon type={tranFormIcon(data.icon)} style={{ width: '40px', height: '40px', margin: 'auto' , display: 'block' }}/><br/>
          {data.name}
      </a>
    )
  }




export default ProductPrint