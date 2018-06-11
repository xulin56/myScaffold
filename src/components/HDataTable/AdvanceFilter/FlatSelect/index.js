import React from 'react';
import PropTypes from 'prop-types';
import {autobind} from 'core-decorators';
import * as actionCreators from '../actions';
import Api from 'lib/api';
import './style.less';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Input } from 'components/Controls';
import {Message} from 'components/I18n';
import {getUrlParam} from "../../../../lib/utils";

@autobind
class FlatSelect extends React.Component {

    static contextTypes = {
        tableName: PropTypes.string,
    };

    static props = {
        options:PropTypes.string.isRequired,
        label:PropTypes.string.isRequired,
        value:PropTypes.string,
        name:PropTypes.string,
        onChange:PropTypes.func.isRequired,
        funcTest: PropTypes.func,
        urlParam: PropTypes.bool,

    };

    static defaultProps = {
        label:'label',
        options:[],
        urlParam: false,
    };

    onChange(_,value) {
        const {tableName} = this.context;
        const {name} = this.props;
        this.props.setFilterField(tableName, name, value);
    }

    /* 回调传递索引 */
    passIdx(item, val){
        if(item.func){
            item.func(val);
        }
    }

    render() {
        const { options, label, name} = this.props;
        const {tableName} = this.context;
        const { onChange, passIdx } = this;
        let formData = {};
        if (this.props && this.props[tableName]) {
            formData = this.props[tableName];
        }
        const  value = formData[name];
        return (
            <div className="flat-select">
                <div className="flat-select-label">{label}</div>
                <div className="flat-select-item-container">
                    {

                        options.map((item,idx) => {
                            let val = value  && value !== 0  ?  value : "";
                            return <li key={idx} onClick={ ()=>{
                                onChange(name,item.value);
                                this.props.refresh(tableName);
                                passIdx(item, item.value);
                            }} className={ "flat-select-item" + (val === item.value ? " active" : "")}>{item.label}</li>;
                        })
                    }
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state, props) => {
    return state.advanceFilterReducers.toJS();
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actionCreators, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(FlatSelect);