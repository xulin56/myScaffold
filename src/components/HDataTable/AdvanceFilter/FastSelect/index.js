import React from 'react';
import PropTypes from 'prop-types';
import FlatSelect from '../FlatSelect';
import "./style.less";
import * as actionCreators from '../actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getUrlParam} from "../../../../lib/utils";

class FastSelect extends React.Component {

    static props = {
        options:PropTypes.array.isRequired,
        initValue:PropTypes.array,
    };

    static defaultProps = {
       options:[]
    };
    static contextTypes = {
        tableName: PropTypes.string,
    };

    componentDidMount(){
        const { options,name,initValue } = this.props;
        const { tableName } = this.context;
        if(options && options.length>0){
            for(let i=0;i<options.length;i++){
                if(options[i].urlParam && options[i].name){
                    const paramValue = getUrlParam(options[i].name);
                    if(paramValue){
                        this.props.setFilterField(tableName,options[i].name,paramValue);
                        this.props.setFilterField(tableName,'showAdvanceFilter',true);
                    }
                }
            }
        }
        if(initValue && initValue.length>0){
            for(let i=0;i<initValue.length;i++){
                this.props.setFilterField(tableName,initValue[i].name,initValue[i].value);
                this.props.setFilterField(tableName,'showAdvanceFilter',true);
            }
        }
    }
    render() {
        const { tableName } = this.context;
        const { options, onClick } = this.props;
        let data = this.props[tableName];

        return (
            data.showAdvanceFilter ?
            <div className="fast-select">
                {
                    options.map((itemProps,idx) => <FlatSelect {...itemProps} key={idx}/> )
                }
            </div>
                : null
        )
    }
}

const mapStateToProps = (state) => {
    let obj = state.advanceFilterReducers;

    return obj ? obj.toJS() : {};
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actionCreators, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(FastSelect);