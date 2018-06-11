import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { CheckBox } from 'components/Controls';
import { Message } from 'components/I18n';
import {bindActionCreators} from "redux";
import * as actionCreators from '../actions';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';

const Row = (props)=>{
   const { rowData,fields,rowSelect,rowId,selected }  = props;
   return (
       <tr>
           {
               rowSelect ?
                   <td className="table-select"><CheckBox onChange={ _ => { props.setSelect(rowData[rowId]);
                   props.setSelectRow(rowData, rowId, selected); } } value={ selected }/></td>
                   : null
           }
           {
               fields.map((fieldConfig,idx) => {
                   const { field ,render,className } = fieldConfig;
                   const result = render ? render(rowData[field],rowData) : rowData[field];
                   return <td className={ className || "" } key={idx}>{(rowData[field]==="" || rowData[field]===null || rowData[field]===undefined) ? "--" : result}</td>
               })
           }
       </tr>
   )
};

@autobind
class Table extends Component {
    static props = {
        fields: PropTypes.array,
        rowSelect: PropTypes.bool,
        rowId: PropTypes.string,
        data:PropTypes.array
    };
    static contextTypes = {
        tableName: PropTypes.string,
    };
    selectAll(){
        const { tableName } = this.context;
       const { data,rowId } = this.props;
       let select = data.map( item => item[rowId]);
       if(this.getSelectAllStatus()){
           this.props.setSelect(tableName,[]);
       }else{
           this.props.setSelect(tableName,select);
       }
    }

    getSelectAllStatus(){
        const { tableName } = this.context;
        const { data } = this.props;
        return this.props[tableName].select && data && data.length !== 0 && this.props[tableName].select.length === data.length;
    }

    setSelect(id){
        const { tableName } = this.context;
        let select = this.props[tableName] ? this.props[tableName].select : [];
        let newSelect = select;
        if(select.includes(id)){
           newSelect = select.filter(item => item !== id);
        }else{
            newSelect = [id,...select];
        }
        this.props.setSelect(tableName,newSelect);
    }

    setSelectRow(data, rowId, cheked){
        const { tableName } = this.context;
        let selectRows = this.props[tableName] ? this.props[tableName].selectRows : [];
        let newSelectRows = selectRows;
        let status=false; let temp=null;
        if(cheked && selectRows.length>0){
            for(let i=0; i<selectRows.length; i++){
                if(selectRows[i][rowId]==data[rowId]){
                    status=true;
                    temp=i;
                }
            }
        }

        if(status){
            selectRows.splice(temp, 1);
            newSelectRows=selectRows;
        }else{
            newSelectRows = [data,...selectRows];
        }

        this.props.setSelectRow(tableName, newSelectRows);
    }

    render() {
        const {fields,data,rowSelect,rowId,select} = this.props;
        const isEmpty = !( data && data.length > 0 );
        const selectAll = this.getSelectAllStatus();
        return (
            <table className="table">
                <thead>
                <tr>
                    {
                        rowSelect ?
                            <th className="table-select">{<CheckBox value={ selectAll } onChange={ this.selectAll } />}</th>: null
                    }

                    {
                        fields.map((item,idx )=> <th key={idx}>{item.label}</th>)
                    }
                </tr>
                </thead>
                <tbody>
                {
                    !isEmpty ?
                    data.map((row,idx) => <Row key={idx} rowData={row} fields={fields} rowId={rowId} rowSelect={rowSelect} setSelect={ this.setSelect } setSelectRow={ this.setSelectRow } selected={ select.includes(row[rowId]) }/>)
                        :
                        <tr>
                            <td colSpan="100%" className="empty-table"><Message id="DATA_TABLE_EMPTY" /></td>
                        </tr>
                }
                </tbody>
            </table>
        )
    }
}

const mapStateToProps = (state) => {
    let obj = state.hDataTableReducers;

    return obj ? obj.toJS() : {};
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actionCreators, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(Table);