import Link from 'next/link';
import React from 'react';
import APP_ROUTER from '../../app.router.json';

export const rewriteUrl = (name: string) => {
    try {
        const newStr = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        return newStr.replace(/\s/g, '-').toLowerCase();
    } catch (e) {
      return '--'
    }
}

const GeneraLink = (props: any) => {
    const {item: {id, name, label}, className, onClick, style: iSt} = props;

    const {path, paramName, paramId } = props;
    return (
        <Link href={`/${path}?${paramName}=${name}&id=${id}`} as={`/${rewriteUrl(name)}-${paramId}${id}`}>
            <a style={iSt} onClick={onClick} className={className}>{label} {props.children}</a>
        </Link>
    )
}

export const LinkCate = (props: any) => {
    return <GeneraLink {...props} path='category' paramName='name' paramId = 'm'/>
}


export interface LinkRouterProps {
    pattern: string,
    page: string,
    is_auth_require: boolean
}

export const findRouter = (routeName: string) => {
    let route = null;
    APP_ROUTER.user.forEach((item: LinkRouterProps) => {
        if(item.pattern === routeName){
            route = item;
        }
    });
    return route

}


export const getValueLocal = (key: string) => {
    return typeof window !== "undefined" ? localStorage.getItem(key) : null;
}

export const setValueLocal = (key: string, value: string) => {
    return typeof window !== "undefined" ? localStorage.setItem(key, value) : null;
}

export const removeValueLocal = (key: string) => {
    return typeof window !== "undefined" ? localStorage.removeItem(key) : null;
}


export const parse = (data:any, df = null) => { 
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
  
export const money = (x: number) => !x ? 0 : x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

export const formatTime = (d: number | any) => {
    if(d instanceof Date) {
      return d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
    }
    return 'N/A';
}