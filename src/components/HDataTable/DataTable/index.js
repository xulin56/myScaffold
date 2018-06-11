import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Table from '../Table';
import Pagination from 'react-sui/Pagination';
import {bindActionCreators} from "redux";
import * as actionCreators from '../actions';
import {connect} from 'react-redux';
import {autobind} from 'core-decorators';
import Toolbar from '../Toolbar';
import "./style.less";
import {Input,Select} from 'components/Controls';
import {Message} from 'components/I18n';
import {error} from 'components/Notifications';
import {getMessage} from "lib/lang";

@autobind
class DataTable extends Component {
    static props = {
        fields: PropTypes.array,
        url: PropTypes.string,
        advanceFilter: PropTypes.bool,
        toolbar: PropTypes.array,
        rowSelect: PropTypes.bool,
        rowId: PropTypes.string
    };

    static defaultProps = {
        advanceFilter: false,
        rowSelect: false,
        rowId: 'id'
    };
    static childContextTypes = {
        tableName: PropTypes.string
    };

    state = {
        jumpPageNum:'',
    };
    getChildContext() {
        return {tableName: this.props.ns};
    }

    componentWillMount() {
        const {ns, url, advanceFilter,rowId} = this.props;
        // console.log(ns, url);
        this.props.initDataTable(ns, url, advanceFilter,rowId);
    }

    componentDidMount() {
        this.refresh(true);
    }

    refresh(flag) {
        const {ns} = this.props;
        this.props.doFilter(ns, !flag);
    }

    onPageChange(page) {
        const {ns} = this.props;
        this.props.setCurrentPage(ns, page);
        this.refresh(true);
    }
    jumpTo(){
        const { total,pageSize } = this.props;
        const { jumpPageNum } = this.state;
        const min = 1;
        const max = Math.ceil(total/pageSize);
        if(jumpPageNum>=min && jumpPageNum<=max){
            this.onPageChange(parseInt(jumpPageNum));
        }else{
            error(getMessage("ERROR_PAGE_NUMBER"));
        }
    }
    render() {
        const {fields, toolbar, total, currentPage, pageSize, data, rowSelect, rowId, ns, select} = this.props;
        const { jumpPageNum } = this.state;
        return (
            <div className="h-data-table">
                {
                    this.props.children
                }
                {
                    toolbar && toolbar.length > 0 ?
                        <Toolbar options={toolbar}/>
                        : null
                }
                <div className='data-table-container'>
                    <Table fields={fields} data={data} rowSelect={rowSelect}
                           rowId={rowId} select={select}/>
                </div>
                <div className="table-footer">
                    <div className="page-size-dropdown">
                        { (data && data.length>0) ?
                            <Message id="START_END_TOTAL" assign={{
                                start:(currentPage-1)*pageSize+1,
                                end:(currentPage-1)*pageSize+data.length,
                                total:total}}/>
                            : <Message id="NO_DATA"/>
                        }
                        {/*<Message id="DISPLAY_PER_PAGE"/>*/}
                        <Select name="select"
                                onChange={(name, value) => {
                                    this.props.setPageSize(ns, value);
                                    this.props.doFilter(ns);
                                }}
                                value={pageSize}
                                config={{
                                    options: [5, 10, 20, 50, 100].map(item => ({
                                        label: item,
                                        value: item
                                    }))
                                }}
                                initialValue={false}
                        />
                        {/*<Message id="DATA_LIST_UNIT"/>*/}
                    </div>
                    <div className='page-jump'>
                        <Message id="JUMP_TO"/>
                        <Input name="pageJump" value={jumpPageNum} onChange={(name,value)=>this.setState({jumpPageNum:value})}/>
                        <Message id="PAGE_UNIT"/>
                        <span className="jump-confirm-btn" onClick={ this.jumpTo }><Message id="SURE"/></span>
                    </div>
                    <Pagination total={total} current={currentPage}
                                pageSize={pageSize} change={this.onPageChange}/>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state, {ns}) => {
    let obj = state.hDataTableReducers.get(ns);

    return obj ? obj.toJS() : {};
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actionCreators, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(DataTable);