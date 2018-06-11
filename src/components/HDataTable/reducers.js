import {fromJS} from 'immutable';
import {enhanceReducers} from "../../lib/utils";

const initialState = fromJS({});
const reducers = {
    INIT_DATA_TABLE(state,{ns,url,advanceFilter,rowId}){
       return state.set(ns,fromJS({
           url,
           data:[],
           total:0,
           select:[],
           currentPage:1,
           pageSize:10,
           advanceFilter,
           rowId,
           selectRows:[],
       }));
    },
    DT_SET_TOTAL(state,{ns,total}){
        return state.setIn([ns,'total'],total) ;
    },
    DT_SET_DATA(state,{ns,data}){
       return state.setIn([ns,'data'],data) ;
    },
    DT_SET_CURRENT_PAGE(state,{ns,page}){
        return state.setIn([ns,'currentPage'],page) ;
    },
    DT_SET_SELECT(state,{ns,select}){
        return state.setIn([ns,'select'],select) ;
    },
    DT_SET_PAGE_SIZE(state,{ns,pageSize}){
        return state.setIn([ns,'pageSize'],pageSize) ;
    },
    DT_SET_SELECT_ROWS(state,{ns, row}){
        return state.setIn([ns,'selectRows'], row) ;
    }
};
export const hDataTableReducers = enhanceReducers(initialState,reducers);