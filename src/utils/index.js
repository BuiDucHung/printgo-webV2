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
      return df;
    }
};

export const PRINT_V2_TYPE = {
    hopCung: 'hopCung', hopMem: 'hopMem', option: 'tuyChinh', 
    tuiGiay: 'tuiGiay', other: 'other', hopSong: 'hopSong', oldForm: 'false'
  };
  
export const money = (x) => !x ? 0 : x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

export const formatTime = d => {
    if(d instanceof Date && !isNaN(d)) {
      return d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
    }
    return 'N/A';
}