import { doFilter } from '../actions';
export const initFilter = (ns)=>{
    return {type:"INIT_ADVANCE_FILTER",param:{ns}};
};

export const setFilterField = (ns,name,value) =>{
  return {type:"SET_ADVANCE_FILTER_FIELD",param:{ns,name,value}};
};

export const setFilterFields = (ns,data) => {
  return { type:"SET_ADVANCE_FILTER_FIELDS",param:{ns,data}};
};


export const toggleAdvanceFilter = (ns) => {
    return  { type:'TOGGLE_ADVANCE_FILTER',param:{ns}};
};

export const clearFilter = (ns) => {
    return  { type:'CLEAR_FILTER',param:{ns}};
};

export const refresh = (ns)=>{
   return  doFilter(ns);
};