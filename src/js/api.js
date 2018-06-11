import {ajax,alerts,Type,lStore,customEvent} from './yydjs';
import {store} from 'store';
import {browser} from 'src';
import * as action from 'store/action/loading';
import md5 from 'md5';
let baseUrl='/app/http/';

//对项目返回参数的处理，对ajax的再次封装
const ajaxWrap=function(json){
    console.log(browser)
    let oldPathname=browser.location.pathname;
    let noLoginArr=[
        // {
        //     path:'/login',//登录
        // },
        // {
        //     path:'/account',//首页
        //     exact:true,
        // },
        // {
        //     path:'/exponent',//指数
        //     exact:true,
        // },
        // {
        //     path:'/information',//资讯
        // },
        // {
        //     path:'/popularize',//推广
        //     exact:true,
        // },
        // {
        //     path:'/data',//数据
        //     exact:true,
        // },
        // {
        //     path:'/article_info',//展示文章
        // },
        // {
        //     path:'/activity_center',//活动中心
        // },
        // {
        //     path:'/advance',//进阶必备
        // },
    ];

    ajax({
        url:json.url,
        type:json.type,
        data:json.data,
        closeToForm:json.closeToForm,
        dataType:json.dataType,
        headers:json.headers,
        xhr:json.xhr,
        progress:json.progress,
        before:function(xhr){
            //loading显示处理
            store.dispatch(action.getLoading(true));;
        },
        error : function(){
            store.dispatch(action.getLoading(false));;
        },
        after:function(xhr){
            //loading隐藏处理
            store.dispatch(action.getLoading(false));;
        },
        success:function(data){
            let pathname=browser.location.pathname;

            if(oldPathname!=pathname)return;//解决卸载组件后调用setState报错
            //只要成功都会走
            json.finally&&json.finally(data);
            //成功code已经失败code处理
            if(Type(data)=="object"){
                if(data.code=='0000'){
                    json.success&&json.success(data);
                    return;
                }
                else if(data.code=='CRM00001'||data.code=='CRM00002'||data.code=='CRM00003'){
                    let redirect=true;
                    for(let value of noLoginArr){
                        if(value.exact){
                            if(pathname==value.path){
                                redirect=false;
                                break;
                            }
                        }else{
                            if(pathname.match(value.path)){
                                redirect=false;
                                break;
                            }
                        }
                    }

                    if(redirect){
                        setTimeout(()=>{
                            //customEvent.emit('needLogin');
                            alerts('请重新登录');
                            browser.replace('/login');
                        });
                    }
                    return;
                }else if(data.msg){
                    alerts(data.msg);
                    json.success&&json.success(data);
                    return;
                }
                alerts("网络异常");
            }
        },
        error:function(error){
            alerts('网络异常');
            store.dispatch(action.getLoading(false));;
        },
    });
};
const severApi = function(url,json,endFn,finallyFn,method){
    const isEmpty = (obj)=>{
        for(let key in obj) {
            if(obj.hasOwnProperty(key)){
                return false;
            }
        }
        return true;
    };
    var addSign = '';
    if(!isEmpty(json)){
        for(var key in json){
            addSign += json[key];
        }
    }
    let sign = md5(addSign+'0123456789');
    let token = lStore.get('token') || '';
    ajaxWrap({
        url:baseUrl+url,
        type:method || 'post',
        data:json,
        dataType:'json',
        headers : {sign,token},
        finally:function(res){
            finallyFn&&finallyFn(res);
        },
        success:function(res){
            endFn&&endFn(res);
        },
    });
};
const STATIC_URL = {
    sendRegisterCode : '/crm/user/sendRegisterCode',//发送注册验证码
    checkRegisterCode : '/crm/user/checkRegisterCode',//校验注册验证码
    checkUserName : '/crm/user/checkUserName',//检测用户名
    mobileRegister : '/crm/user/mobileRegister',//手机号注册
    userNameLogin : '/crm/user/userNameLogin',//用户名登录
    mobileLogin : '/crm/user/mobileLogin',//手机号登录
    userinfo : '/crm/user/info',//用户信息
    sendForgetPwdCode : '/crm/user/sendForgetPwdCode',//发送找回密码验证码
    checkForgetPwdCode : '/crm/user/checkForgetPwdCode',//校验找回密码验证码
    editPasswordByMobile : '/crm/user/editPasswordByMobile',//根据手机号修改密码
    listHistoryOrder : '/crm/trade/listHistoryOrder',//列出历史订单
    tradingConfig : '/crm/trade/config',//USDT交易配置
    buyOrder : '/crm/trade/buyOrder',//购买USDT
    sellOrder : '/crm/trade/sellOrder',//购买USDT
    fundInfo : '/crm/fund/info',//获取资金信息
    cancelOrder : '/crm/trade/cancelOrder',//撤销订单
    bankList : '/crm/bank/list',//银行列表
    editHeadImg : '/crm/user/editHeadImg',//修改头像
    payOrder : '/crm/trade/payOrder',//已支付订单
    queryOrder : '/crm/trade/queryOrder',//按条件查询订单POST /crm/trade/timeOutOrder
    timeOutOrder : '/crm/trade/timeOutOrder',//超时订单

};

module.exports = {
    CustomApi : function(url,params,cb) {
        severApi(url,params,cb)
    },
    SendRegisterCode : function(params,cb){
        severApi(STATIC_URL.sendRegisterCode,params,cb)
    },
    CheckRegisterCode : function(params,cb){
        severApi(STATIC_URL.checkRegisterCode,params,cb)
    },
    CheckUserName : function(params,cb){
        severApi(STATIC_URL.checkUserName,params,cb)
    },
    MobileRegister : function(params,cb){
        severApi(STATIC_URL.mobileRegister,params,cb)
    },
    UserNameLogin : function(params,cb){
        severApi(STATIC_URL.userNameLogin,params,cb)
    },
    MobileLogin : function(params,cb){
        severApi(STATIC_URL.mobileLogin,params,cb)
    },
    UserInfo : function(params,cb,finallyFn){
        severApi(STATIC_URL.userinfo,params,cb,finallyFn)
    },
    SendForgetPwdCode : function(params,cb){
        severApi(STATIC_URL.sendForgetPwdCode,params,cb)
    },
    CheckForgetPwdCode : function(params,cb){
        severApi(STATIC_URL.checkForgetPwdCode,params,cb)
    },
    EditPasswordByMobile : function(params,cb){
        severApi(STATIC_URL.editPasswordByMobile,params,cb)
    },
    TradingConfig : function(params,cb){
        severApi(STATIC_URL.tradingConfig,params,cb)
    },
    BuyOrder : function(params,cb){
        severApi(STATIC_URL.buyOrder,params,cb)
    },
    SellOrder : function(params,cb){
        severApi(STATIC_URL.sellOrder,params,cb)
    },
    ListHistoryOrder : function(params,cb){
        severApi(STATIC_URL.listHistoryOrder,params,cb)
    },
    FundInfo : function(params,cb,finallyFn){
        severApi(STATIC_URL.fundInfo,params,cb,finallyFn)
    },
    CancelOrder : function(params,cb){
        severApi(STATIC_URL.cancelOrder,params,cb)
    },
    BankList : function(params,cb){
        severApi(STATIC_URL.bankList,params,cb)
    },
    EditHeadImg : function(params,cb){
        severApi(STATIC_URL.editHeadImg,params,cb)
    },
    PayOrder : function(params,cb){
        severApi(STATIC_URL.payOrder,params,cb)
    },
    QueryOrder : function(params,cb){
        severApi(STATIC_URL.queryOrder,params,cb)
    },
    TimeOutOrder : function(params,cb){
        severApi(STATIC_URL.timeOutOrder,params,cb)
    },
};
