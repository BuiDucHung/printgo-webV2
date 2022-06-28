import React, {useEffect} from 'react'
import Footer from './Footer'
import Headers from './Header'
import {findRouter} from '../utils/index';
import { useRouter } from 'next/router';
import { useStore } from 'StoreContext';
import { InAppEvent } from 'utils/FuseUtils';
import { CHANGE_STORE } from 'const';
import { changeStore } from 'methods/changeStore';

const LayoutMain = (props) => {
  const router = useRouter();
  const {pathname, state} = router;
  const {state: {user} , dispatch} = useStore();
  React.useEffect(() => {
    const listener = InAppEvent.addEventListener(CHANGE_STORE, (data) => changeStore(dispatch, data));
    return () => {
      InAppEvent.removeListener(CHANGE_STORE, listener);
    }
  },[])


  useEffect(() => {
      const redirectURL = state && state.redirectURL ? state.redirectURL : '/';
      const curentRouter = findRouter(pathname);
      if(curentRouter?.is_auth_require === true && user === null) {
        if(typeof window !== 'undefined'){
          router.push({pathname: '/'})
        }else if(pathname !== '/' && redirectURL != '/'){
          router.push({pathname: redirectURL});
        }
      }
  },[pathname, state])
  return (
    <div style={{width: '100%'}}>
       <Headers/>
          {props.children}
        <Footer/>
    </div>
  )
}

export default LayoutMain