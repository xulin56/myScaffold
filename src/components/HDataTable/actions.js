import Store from '../../store';
import API from 'lib/api';

export const initDataTable = (ns,url,advanceFilter,rowId)=>{
   return {type:"INIT_DATA_TABLE",param:{ns,url,advanceFilter,rowId}};
};

export const setCurrentPage = (ns,page)=>{
 return {type:'DT_SET_CURRENT_PAGE',param:{ns,page}};
};

export const setPageSize = (ns,pageSize)=>{
    return {type:'DT_SET_PAGE_SIZE',param:{ns,pageSize}};
};

export const setSelect = (ns,select)=>{

    return {type:'DT_SET_SELECT',param:{ns,select}};
};

export const setSelectRow = (ns,row)=>{
    return {type:'DT_SET_SELECT_ROWS',param:{ns,row}};
};

export const doFilter = (ns,flag = true)=>{
    const { advanceFilterReducers,hFormReducers,hDataTableReducers } = Store.getState();
    const formNs = "data-table-"+ns;
    const dataTable = hDataTableReducers.get(ns).toJS();
    const { url,pageSize,currentPage,advanceFilter } = dataTable;
    let formData = {};
    if(advanceFilter){
        let { showAdvanceFilter,searchBoxName,searchBoxValue,...fData } =  advanceFilterReducers.get(ns).toJS();
        formData = fData;
        if(searchBoxValue  || searchBoxValue  === 0 ){
            formData[searchBoxName] = searchBoxValue;
        }
    }else{
        formData = hFormReducers.getIn([formNs,'data']) ? hFormReducers.getIn([formNs,'data']).toJS() : {};
    }

    return dispatch => {
        let param = {page:currentPage,pageSize:pageSize,...formData};
        if(flag){
            dispatch(setCurrentPage(ns,1));
            param.page = 1;
        }
        dispatch(setSelect(ns,[]));
        API.post(url,param,(resp)=>{
            const { dataList,rows }  = resp || { dataList:[],rows:0};
            dispatch({type:'DT_SET_TOTAL',param:{ns,total:rows}});
            dispatch({type:'DT_SET_DATA',param:{ns,data:dataList}});
        });
    }
};