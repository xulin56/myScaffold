import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as actionCreators from "../../actions";
import {DateRangeSplit,DateRange} from 'components/Controls';
import {autobind} from 'core-decorators';
@autobind
class ShortCutRange extends React.Component {
    static props = {
        data: PropTypes.object.isRequired,
    };
    static contextTypes = {
        tableName: PropTypes.string,
    };
    rangeChange(value){
        const {data} = this.props;
        const {tableName} = this.context;
        this.props.setFilterField(tableName, data.name[0], value[0]);
        this.props.setFilterField(tableName, data.name[1], value[1]);
        this.props.refresh(tableName);
    }
    componentWillMount(){
        const {data} = this.props;
        const {tableName} = this.context;
        let val = typeof data.value === "function" ? data.value() : data.value;
        this.props.setFilterField(tableName, data.name[0], val[0]);
        this.props.setFilterField(tableName, data.name[1], val[1]);
    }
    render(){
        const {tableName} = this.context;
        const {data} = this.props;
        const value = data.name.map( item => this.props[tableName][item]);
        return <div className="shortcut-date-range">
            <span>{data.label}</span>
            <div><DateRange name={data.name} value={value} onChange={(name,value)=>this.rangeChange(value)}/></div>
        </div>
    }
}
const mapStateToProps = (state, props) => {
    return state.advanceFilterReducers.toJS();
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actionCreators, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(ShortCutRange);