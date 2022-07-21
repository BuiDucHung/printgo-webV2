import { getValueLocal, parse } from '../utils/index';
import { DataManager } from '../utils/StoreManager';

const KEY = "card";
export const initCard = () => {
    const cards = getValueLocal(KEY);
    return parse(cards, []);
}

export const addToCard = ({typeCard, data}) => {
    const cards = DataManager.getCards();
    console.log('----- cards data', cards);
}