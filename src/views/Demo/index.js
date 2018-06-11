import React from 'react';
import {autobind} from 'core-decorators';
import './style.scss';

@autobind
export default class Demo extends React.Component{
    constructor(props){
        super(props);
        this.state={

        };
    }

    componentDidMount(){

    }

    render(){
        return(
            <div className="demo">
              <i className='iconfont icon-jiantou'></i>
              <h3>sldsljds <span>3049034903</span> </h3>
            </div>
        )
    }
}
