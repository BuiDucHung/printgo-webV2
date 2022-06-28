import APP_ROUTER from '../../app.router';

export const findRouter = (routeName) => {
    let route = null;
    APP_ROUTER.user.forEach(item => {
        if(item.pattern === routeName){
            route = item;
        }
    });
    return route

}


export const getValueLocal = (key) => {
    return typeof window !== "undefined" ? localStorage.getItem(key) : null;
}

export const setValueLocal = (key, value) => {
    return typeof window !== "undefined" ? localStorage.setItem(key, value) : null;
}

export const removeValueLocal = (key) => {
    return typeof window !== "undefined" ? localStorage.removeItem(key) : null;
}


export const parse = (data, df = null) => { 
    try {
      return data ? JSON.parse(data) : df
    } catch (er) {
      /* console.log('====== parse json err --', er); */
      return df;
    }
  };