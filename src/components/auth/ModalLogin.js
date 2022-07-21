import React, {useState} from 'react'
import { Modal } from 'antd';
import {CloseOutlined, UserAddOutlined, UserDeleteOutlined} from '@ant-design/icons';

import styles from 'styles/ModalLogin.module.scss';
import Dangky from './Dangky';
import { Dangnhap } from './Dangnhap';


export const ModalLogin = ({visible, setVisible}) => {
    const [ actionRegister, setActionRegister ] = useState(false);
    const handleCancel = () => {
        setVisible(false);
    };

    const memoForm = React.useMemo(() => {
        return actionRegister ? <Dangky setVisible={setVisible}/> : <Dangnhap setVisible={setVisible}/>
    },[actionRegister])
  
 
    return (
        <div>  
        <Modal style={{maxWidth: '400px'}} visible={visible} footer={false} closable={false} onCancel={handleCancel} >
         <div style={{display: 'flex', justifyContent: 'space-between'}}>
             <p style={{padding: 20}} onClick={handleCancel}>
            <CloseOutlined style={{border: '2px solid #2dbeb3', color: '#2dbeb3', borderRadius: '50px', padding: 3 , fontSize: 20, cursor: 'pointer'}}/></p>
             <div className={styles.changeAuth}>
             <div onClick={() => setActionRegister(!actionRegister)}>
                {
                  actionRegister ? <UserAddOutlined style={{fontSize: 30, cursor: 'pointer', color: '#fff'}}/> 
                  : 
                  <UserDeleteOutlined style={{fontSize: 30, cursor: 'pointer', color: '#fff'}}/>
                }
            </div>
            <p onClick={() => setActionRegister(!actionRegister)} style={{color: '#fff', cursor: 'pointer',fontSize: 14, fontWeight: 600}}>{actionRegister ? 'Đăng nhập' : 'Đăng ký'}</p>
             </div>
         </div>
            <div style={{padding: '5px 30px', paddingBottom: '35px'}}>
                {memoForm}
            </div>
        </Modal>
    </div>
    )
}
