import Store from '../../store';
import FHelpers from 'components/HForm/helpers';
import AFHelpers from 'components/HDataTable/AdvanceFilter/helpers';
import {doFilter} from './actions';

export default class DHelpers {
    ns = "";
    fHelpers = null;
    afHelpers = null;

    constructor(ns) {
        this.ns = ns;
        this.fHelpers = new FHelpers("data-table-" + ns);
        this.afHelpers = new AFHelpers(ns);
    }

    getRowDataByRowId(){

    }

    getFHelpers() {
        return this.fHelpers;
    }

    getAFHelpers(){
        return this.afHelpers;
    }

    refresh(flag = true) {
        Store.dispatch(doFilter(this.ns, flag));
    }

    getRowDataById(id){
        const { hDataTableReducers } = Store.getState();
        const dataTable = hDataTableReducers.get(this.ns).toJS();
        return dataTable.data.find(item=>{return item[dataTable.rowId]==id})
    }
}

