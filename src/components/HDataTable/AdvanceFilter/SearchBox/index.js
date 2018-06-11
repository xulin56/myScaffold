import React , { Component } from 'react';
import { IconFont } from 'components/Icon';
import { Select } from 'components/Controls';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as actionCreators from '../actions';
import { connect } from 'react-redux';
import { Input } from 'components/Controls';
import { Button } from 'components/Button';
import { autobind } from 'core-decorators';
import { Message } from 'components/I18n';
import { getUrlParam } from "lib/utils";
import "./style.less";

@autobind
class SearchBox extends Component {

    static props = {
        options:PropTypes.array.isRequired,
        showToggle:PropTypes.bool,
        urlParam:PropTypes.bool,
    };

    static defaultProps = {
        showToggle: false,
        urlParam: false,
    };

    static contextTypes = {
        tableName: PropTypes.string,
    };

    onChange(name,value){
        const { tableName } = this.context;
        this.props.setFilterField(tableName,name,value);
    }

    componentDidMount(){
        const { options,setFilterField } = this.props;
        if(options && options.length>0 && options[0].value){
            const { tableName } = this.context;
            for(let i=0;i<options.length;i++){
                if(options[i].urlParam && options[i].value){
                    const paramValue = getUrlParam(options[i].value);
                    if(paramValue){
                        setFilterField(tableName,'searchBoxName',options[i].value);
                        setFilterField(tableName,'searchBoxValue',paramValue);
                        return;
                    }
                }
            }
            setFilterField(tableName,'searchBoxName',options[0].value);
        }
    }
    render(){
        const { tableName } = this.context;
        const filterData = this.props[tableName] || {};
        const { options } = this.props;
        const { showAdvanceFilter } = filterData;
        return (
            <div className="search-box">
                <div className="search-box-control">
                <Select
                    name="searchBoxName"
                    config={ { options }}
                    onChange={this.onChange }
                    value={filterData['searchBoxName']}
                />
                <Input
                    name="searchBoxValue"
                    value={filterData['searchBoxValue']}
                    onChange={ this.onChange }
                    placeholder={<Message id="PLEASE_INPUT_KEYWORD" />}
                />
                </div>
                <Button text={ <span><IconFont name="search" /><Message id="SEARCH" /></span> } type="button" className="btn btn-default search"
                        onClick={ _ => { this.props.refresh(tableName)  }}
                />
                <Button text={ <Message id="CLEAR"/> } type="button" className="btn btn-default clear"
                        onClick={ _ => {
                    this.props.clearFilter(tableName)
                }}/>
                {
                    this.props.showToggle &&
                    <div className={"advance-filter-toggle" + (!showAdvanceFilter ? " collapsed" : "" )}  onClick={ _ => this.props.toggleAdvanceFilter(tableName) }>
                        <Message id={ !showAdvanceFilter ? 'ADVANCE_FILTER' : 'COLLAPSE'} />
                        <IconFont name="angle_down" />
                    </div>
                }
            </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);
