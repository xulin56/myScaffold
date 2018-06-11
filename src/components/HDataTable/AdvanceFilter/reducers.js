import {fromJS} from 'immutable';
import {enhanceReducers} from "../../../lib/utils";

const initialState = fromJS({});
const reducers = {
    INIT_ADVANCE_FILTER(state,{ns}){
       return state.set(ns,fromJS({}));
    },
    SET_ADVANCE_FILTER_FIELD(state,{ns,name,value}){
        return state.setIn([ns,name],value);
    },
    SET_ADVANCE_FILTER_FIELDS(state,{ns,data}){
        return state.updateIn([ns],(obj)=> obj.merge(data));
    },
    TOGGLE_ADVANCE_FILTER(state,{ns}){
        let status = state.getIn([ns,'showAdvanceFilter']);
       return state.setIn([ns,'showAdvanceFilter'], !status)
    },
    CLEAR_FILTER(state,{ns}){
        return state.updateIn([ns],(obj)=> {
            return fromJS({
                'searchBoxName':obj.toJS().searchBoxName,
                'searchBoxValue':"",
                'showAdvanceFilter':obj.toJS().showAdvanceFilter
            })
        });
    }
};
export const advanceFilterReducers = enhanceReducers(initialState,reducers);