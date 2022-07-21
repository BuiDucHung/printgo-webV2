import { getValueLocal, parse, setValueLocal } from "../utils/index";
const KEY_COMBO = 'combo';
const KEY_TAMPLACE = 'templace';

class StoreManager {
    defaultDf = () => { 
       return {inan:{}, giacong:[]}
    };
    orderTemplate = this.defaultDf();
    setStore = (datas) => this.data = datas;
    getWithKey = (key, df = null) => this?.data?.[key] || df;
    getCards = () => this.getWithKey('cards', []);
    setCurrentCombo = (currentCombo) => setValueLocal(KEY_COMBO, JSON.stringify(currentCombo));
    getCurrentCombo = () => parse(getValueLocal(KEY_COMBO), null);
    setCurrentTemplace = (templace) => setValueLocal(KEY_TAMPLACE, JSON.stringify(templace));
    getCurrentTemplace = () => parse(getValueLocal(KEY_TAMPLACE), null);
}

export const DataManager = new StoreManager();
