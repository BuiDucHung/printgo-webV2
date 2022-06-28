import { InAppEvent } from "utils/FuseUtils";
import { CHANGE_STORE } from "const";

export const putToStore = (data) => InAppEvent.emit(CHANGE_STORE, data);
export const changeStore = (dispatch, {type, data}) => dispatch({type, data});