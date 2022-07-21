export const gateway = 'https://web-api.printgo.vn'
export const domain = 'https://printgo.vn';
export const media = domain + '/uploads';
export const cdp = 'http://61.28.235.166:8060';
export const print = 'https://cdp-api.printgo.vn'
export const URL_CDP = cdp;
export const price = cdp + '/rt-price';
export const GATEWAY = "http://172.17.0.1:8000"

export const API = {
    DATA_BUSINESS: "api/featureBusiness",
    DATA_PRODUCT_OUTSTANDING: "api/productOutstanding",
    DATA_CATEGORY: "api/category",
    DATA_NEW_CATE: "api/newsCategory",
}

export default {
    env: process.env.NODE_ENV,
    mode: process.env.MODE,
    gateway: gateway
}

export const STATUS_ORDER = {
    BAO_GIA: 0,
    CAN_PHE_DUYET:16,
    DESIGNER_DANG_THIET_KE:1,
    DESIGNER_SUA_THIET_KE:2,
    DESIGNER_CHO_DUYET_THIET_KE:17,
    DESIGNER_THIET_KE_XONG: 3,
    PERCHARGING_DUYET_SAN_XUAT:13,
    SUPPLIER_SAN_XUAT_VA_GIA_CONG:4,
    SUPPLIER_HOAN_THANH: 18,
    SUPPLIER_SAN_XUAT_LAI:19,
    WARE_HOUSE_DANG_CHUYEN_VE_KHO:5,
    WARE_HOUSE_TRONG_KHO: 6,
    WARE_HOUSE_DANG_GIAO_HANG:7,
    WARE_DON_HANG_LOI: 14,
    WARE_DON_HANG_THIEU: 20,
    SHIPPING_DANG_GIAO:21,
    SHIPPING_DA_GIAO:22,
    SHIPPING_GIAO_LOI:23,
    SHIPPING_GIAO_TRE:24,
    ACOUNTANT_HOAN_THANH:8,
    ACOUNTANT_HOAN_TIEN:15,
    ACOUNTANT_DA_THANH_TOAN:9,
    ACOUNTANT_DON_HANG_LOI:10,
    ACOUNTANT_HUY_DON: 11,
    ACOUNTANT_KHONG_THANH_TOAN: 12,
    CUSTOMER_CHUA_THANH_TOAN: 9999,
    SUPPLIER_DELAY: 9991,
};

const STATUS = {
    COLOR_GREEN: 2,
    COLOR_PINK: 3,
    COLOR_BLUE: 4,
}

export const colorStatus = status => {
    let background;
    switch(status) {
        case STATUS.COLOR_GREEN: background = "#2dbeb3"; break;
        case STATUS.COLOR_PINK: background = "#ff3e89"; break;
        case STATUS.COLOR_BLUE: background = "#1291d2"; break;
        default: background = ""
    }
    return background;
}

export const colorByStatus = status => {
    let color;
    switch (status) {
        case STATUS_ORDER.BAO_GIA: color = "#00b0d8"; break;
        case STATUS_ORDER.CAN_PHE_DUYET : color = "#fdb933"; break;
        case STATUS_ORDER.DESIGNER_DANG_THIET_KE: color = "#00b0d8"; break;
        case STATUS_ORDER.DESIGNER_SUA_THIET_KE: color = "#fdb933"; break;
        case STATUS_ORDER.DESIGNER_CHO_DUYET_THIET_KE: color = "#f26f21"; break;
        case STATUS_ORDER.DESIGNER_THIET_KE_XONG: color = "#0066b2"; break;
        case STATUS_ORDER.PERCHARGING_DUYET_SAN_XUAT: color = "#f26f21"; break;
        case STATUS_ORDER.SUPPLIER_SAN_XUAT_VA_GIA_CONG: color = "#231f20"; break;
        case STATUS_ORDER.SUPPLIER_HOAN_THANH: color = "#fdb933"; break;
        case STATUS_ORDER.SUPPLIER_SAN_XUAT_LAI: color = "#ec1c24"; break;
        case STATUS_ORDER.WARE_HOUSE_DANG_CHUYEN_VE_KHO: color = "#0066b2"; break;
        case STATUS_ORDER.WARE_HOUSE_TRONG_KHO: color = "#fdb933"; break;
        case STATUS_ORDER.WARE_HOUSE_DANG_GIAO_HANG: color = "#00b0d8"; break;
        case STATUS_ORDER.WARE_DON_HANG_LOI: color = "#ec1c24"; break;
        case STATUS_ORDER.WARE_DON_HANG_THIEU: color = "#ec1c24"; break;
        case STATUS_ORDER.SHIPPING_DA_GIAO: color = "#fdb933"; break;
        case STATUS_ORDER.SHIPPING_DANG_GIAO: color = "#00b0d8"; break;
        case STATUS_ORDER.ACOUNTANT_HOAN_THANH: color = "#4ba6c9"; break;
        case STATUS_ORDER.ACOUNTANT_HUY_DON: color = "#5a3885"; break;
        default : color = "#0ec069";
    }
    return color;
}
