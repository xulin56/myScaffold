import Store from '../../../store';
import { setFilterFields,setFilterField } from './actions';

export default class AFHelpers  {
    ns = "";
    constructor(ns){
        this.ns = ns;
    }

    checkNs(){
        if(this.ns === ""){
            return console.error(`Form namespace is needed`);
        }
    }
    setData(data){
        this.checkNs();
        Store.dispatch(setFilterFields(this.ns,data));
        return this;
    }

    setField(name,data){
        this.checkNs();
        Store.dispatch(setFilterField(this.ns,name,data));
        return this;
    }
}

