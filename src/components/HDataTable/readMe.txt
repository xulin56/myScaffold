import React from 'react';
import {Panel} from 'components/Panel';
import {DataTable, Filter, FilterControl,DHelpers} from 'components/HDataTable';
import { AdvanceFilter,SearchBox,FastSelect,ShortCut } from 'components/HDataTable';
import { Message } from 'components/I18n';
import moment from 'moment';
import { getUrlParam} from "lib/utils";
import F from 'lib/fields';
import SendEmail from './SendEmail';
import { error } from 'components/Notifications';
import { getMessage } from 'lib/lang';
import './style.less';

const NS = 'user-list-data-table';
const dHelpers = new DHelpers(NS);
const afHelpers = dHelpers.getAFHelpers();
const formatter = "YYYY-MM-DD";
export default class UserList extends React.Component {
    state = {
        open: false,
        ids: '',
        regSource:{},
    };
    componentWillMount(){
        this.setState({
            regSource: {1:'PC'}
        })
    };
    render() {
        const { open,ids,regSource } = this.state;
        return (
            <Panel>
                <div className="user-list">
                    <DataTable
                        ns={NS}
                        url="/user/getUserBaseList"
                        fields={[
                            {label: <Message id="USER_ID"/>, field: 'userId',render(item){
                                return <a href={"/account/user_detail?userId="+item}>{item}</a>;
                            }},
                            {label: <Message id="NICKNAME"/>, field: 'nickName'},
                            {label: <Message id="FULLNAME"/>, field: 'name',className: 'overflow-three-pointer'},
                            {label: <Message id="EMAIL"/>, field: 'email'},
                            /*{label: <Message id="REG_SOURCE"/>, field: 'registerSid',render(data){
                                return regSource[data] || data;
                            }},*/
                            {label: <Message id="REG_TIME"/>, field: 'registerTime',render(item){
                                return moment(item).format("YYYY-MM-DD HH:mm:ss");
                            }},
                            {label: <Message id="LAST_LOGIN_TIME"/>, field: 'loginLastTime',render(item){
                                return moment(item).format("YYYY-MM-DD HH:mm:ss");
                            }},
                        ]}
                        toolbar={[
                            {label:<Message id="SEND_EMAIL"/>,icon:'news',fn:(item)=>{
                                    let arr = [];
                                    for(let i=0;i<item.length;i++){
                                        const rowData = dHelpers.getRowDataById(item[i]);
                                        arr.push(rowData.userId);
                                    }
                                    this.setState({open:true,ids:arr.join(',')});
                                },alwaysShow:true}
                        ]}
                        rowSelect
                        advanceFilter
                    >
                        <AdvanceFilter>
                            <SearchBox showToggle options={ [
                                {value:"userId",label:<Message id="USER_ID"/>},
                                {value:"nickName",label:<Message id="NICKNAME"/>},
                                {value:"name",label:<Message id="FULLNAME"/>},
                                {value:"email",label:<Message id="EMAIL"/>},
                                {value:"telAuth",label:<Message id="MOBILE"/>},
                                {value:"referId",label:<Message id="REFER_ID"/>,urlParam:true},
                            ]}/>
                            <ShortCut options={[
                                {
                                    type:"text",
                                    name:["fromTime","thruTime"],
                                    label:"一周",
                                    value:()=>{
                                        let today = moment();
                                        let todayStr = today.format(formatter);
                                        let prevDay = today.subtract(7, 'days');
                                        return [prevDay.format(formatter) + " 00:00:00", todayStr + " 23:59:59"];
                                    },
                                },
                                {
                                    type:"text",
                                    name:["fromTime","thruTime"],
                                    label:"一月",
                                    value:()=>{
                                        let today = moment();
                                        let todayStr = today.format(formatter);
                                        let prevDay = today.subtract(1, 'months');
                                        return [prevDay.format(formatter) + " 00:00:00", todayStr + " 23:59:59"];
                                    },
                                },
                                {
                                    type:"text",
                                    name:["fromTime","thruTime"],
                                    label:"半年",
                                    value:()=>{
                                        let today = moment();
                                        let todayStr = today.format(formatter);
                                        let prevDay = today.subtract(6, 'months');
                                        return [prevDay.format(formatter) + " 00:00:00", todayStr + " 23:59:59"];
                                    },
                                },
                                {
                                    type:"dateRange",
                                    name:["fromTime","thruTime"],
                                    label:"注册时间",
                                    value:()=>{
                                        let today = moment();
                                        let todayStr = today.format(formatter);
                                        let prevDay = today.subtract(7, 'days');
                                        return [prevDay.format(formatter) + " 00:00:00", todayStr + " 23:59:59"];
                                    },
                                }
                            ]}/>
                            <FastSelect options={[
                                {
                                    label:<Message id="REG_SOURCE"/>,
                                    name:"registerSid",
                                    options:[
                                        {label:"小米-期货策略宝",value:"10001"},
                                        {label:"oppo-期货策略宝",value:"10002"},
                                        {label:"华为-期货策略宝",value:"10003"}
                                    ]
                                },
                                {
                                    label:<Message id="REG_TERMINAL"/>,
                                    name:"registerTerminal",
                                    options:F.getSelectMap('REGISTER_TERMINAL')
                                },
                                {
                                    label:<Message id="USER_LEVEL"/>,
                                    name:"userLevel",
                                    options:F.getSelectMap('USER_LEVEL')
                                },
                                {
                                    label:<Message id="LOGOUT_STATUS"/>,
                                    name:"userStatus",
                                    urlParam:true,
                                    options:F.getSelectMap('OVER_STATUS')
                                },
                                {
                                    label:<Message id="BLACK_LIST"/>,
                                    name:"userBlack",
                                    options:F.getSelectMap('BLACK_STATUS')
                                },
                            ]}/>
                        </AdvanceFilter>
                    </DataTable>
                    { open ? <SendEmail ids={ids} fnClose={ ()=>this.setState({open:false})}/> : null }
                </div>
            </Panel>
        )
    }
}
