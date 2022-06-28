import React from 'react';

export const useUnmount = (callback) => {
    const callbackRef = React.useRef(callback);
    callbackRef.current = callback;
    React.useEffect(() => {
        callbackRef.current();
    },[])
}