
export function decodeProperty(obj, propertys = []) {
    if(!obj || typeof obj !== 'object') {
        return;
    }
    for(let k in obj) {
        const value = obj[k];
        if(propertys.includes(k) && value && typeof value === 'string') {
            obj[k] = JSON.parse(value);
        }
    }
}

export function encodeProperty(obj, propertys = []) {
    if(!obj || typeof obj !== 'object') {
        return;
    }
    for(let k in obj) {
        const value = obj[k];
        if(propertys.includes(k) && value && typeof value === 'object') {
            obj[k] = JSON.stringify(value);
        }
    }
}