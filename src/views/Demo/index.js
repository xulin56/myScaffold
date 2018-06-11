import React from 'react';
import {autobind} from 'core-decorators';
import API from 'js/api';
import {Tabs,TabsItem} from 'components/Tabs';
import {HInput} from 'components/Form';
import './style.scss';

@autobind
export default class Demo extends React.Component{
    state = {
      nav : [
        {
          label : '当前订单',
          icon : 'A-2'
        },
        {
          label : '历史订单',
          icon : 'A-2'
        },
      ],
      tabIndex : 0,
      val : ''
    }
    tab(index) {

    }
    componentDidMount(){
        API.UserInfo({},(res)=>{
            console.log(res)
        })
    }
    render(){
      const {nav,tabIndex,val} = this.state;
        return(
            <div className="demo">
              <i className='iconfont icon-jiantou'></i>
              <h3>sldsljds <span>3049034903</span> </h3>
              <Tabs labels={nav} tabClick={this.tab} tabIndex={tabIndex}>
                <TabsItem><div>34903493</div></TabsItem>
                <TabsItem><div>233434</div></TabsItem>
              </Tabs>
              <HInput type="text" icon='B-3' value={val} changeVal={(name,val)=>this.setState({val})} clearVal={()=>this.setState({val:''})} />
            </div>
        )
    }
}
