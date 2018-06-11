import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as actionCreators from '../actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {isEmpty} from 'lib/utils';
import {List, ListItem} from 'components/List';
import {Button} from 'components/Button';
import "./style.less";

class AdvanceFilter extends Component {

    static props = {
        className: PropTypes.string,
    };

    static defaultProps = {
        className: 'h-advance-filter h-advance-filter-default',
        secondaryButton:null
    };

    static contextTypes = {
        tableName: PropTypes.string,
    };

    componentWillMount() {
        this.props.initFilter(this.context.tableName);
    }

    render() {
        const {  className } = this.props;
        return <div className={className}> {this.props.children} </div>;
    }
}


const mapStateToProps = (state) => {
    let obj = state.advanceFilterReducers;

    return obj ? obj.toJS() : {};
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actionCreators, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(AdvanceFilter);