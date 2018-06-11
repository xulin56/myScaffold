import React,{ Component } from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from "redux";
import * as actionCreators from '../actions';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';
import { IconFont } from 'components/Icon';
import "./style.less";

@autobind
class Toolbar extends Component {

    static props = {
      options:PropTypes.array
    };

    static contextTypes = {
        tableName: PropTypes.string,
    };

    render(){
        const { options } = this.props;
        const { tableName } = this.context;
        const select = this.props[tableName] ? this.props[tableName].select : [];
        const selectRows = this.props[tableName] ? this.props[tableName].selectRows : [];
        return (
            <div className="data-table-toolbar">
                {
                    options.map((option,idx) => {
                        return (
                            <li onClick={_ => {
                                option.fn && option.fn(select, option.data);
                                option.fnSelect && option.fnSelect(selectRows, option.data);
                            }} key={idx} className={"data-table-toolbar-item"
                            + (option.alwaysShow || (select && select.length>0 ) ?  "" : " hide")}>
                                <IconFont name={option.icon} />
                                <span className="data-table-toolbar-label">{option.label}</span>
                            </li>
                        );
                    })
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    let hDataTable = state.hDataTableReducers.toJS();
    let advanceFilter = state.advanceFilterReducers.toJS();

    return {...hDataTable,advanceFilter:advanceFilter};
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actionCreators, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);