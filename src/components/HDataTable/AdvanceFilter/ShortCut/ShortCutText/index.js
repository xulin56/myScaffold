import React from 'react';
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as actionCreators from "../../actions";
import {autobind} from 'core-decorators';

@autobind
class ShortCutText extends React.Component {
    static props = {
        data: PropTypes.object.isRequired,
    };
    static contextTypes = {
        tableName: PropTypes.string,
    };
    toggle(){
        const {tableName} = this.context;
        const {data} = this.props;

        let flag = this.getActiveStatus();
        const value = typeof(data.value)=='function' ? (flag ? ["",""]:data.value()) : (flag ? "":data.value);
        if(data.name instanceof Array){
            this.props.setFilterField(tableName, data.name[0], value[0]);
            this.props.setFilterField(tableName, data.name[1], value[1]);
        }else{
            this.props.setFilterField(tableName, data.name, value);
        }
        this.props.refresh(tableName);
    }
    getActiveStatus(){
        const {tableName} = this.context;
        const {data} = this.props;
        let val = typeof data.value === "function" ? data.value() : data.value;
        if( data.name instanceof Array){
            let result = true;
            if(!val || !(val instanceof Array)){
                return false;
            }
            data.name.forEach((item,idx) => {
                if(this.props[tableName][item] !== val[idx]){
                    result = false;
                }
            });
            return result;
        }else{
            return this.props[tableName][data.name] === val;
        }
    }
    render(){
        const {data} = this.props;
        return <span className={"shortcut-text"+(this.getActiveStatus() ? " active":"")}
                     onClick={ this.toggle }
        >{data.label}</span>
    }
}
const mapStateToProps = (state, props) => {
    return state.advanceFilterReducers.toJS();
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actionCreators, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(ShortCutText);