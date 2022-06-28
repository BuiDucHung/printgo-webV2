import React from 'react';

/*============ useUpdateEffect ========*/

export const UpdateUseEffect = (effectCallback, deps = []) => {
    const isFirstMout = React.useRef(false);

    React.useEffect(() => {
        return () => {
            isFirstMout.current = false;
        }
    },[])

    React.useEffect(() => {
         // Không thực thi code cho lần đầu tiên watch
         if(!isFirstMout.current){
             isFirstMout.current = true;

         }else{
             return effectCallback;
         }
    }, deps)
}