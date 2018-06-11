import React from 'react';
import PropTypes from 'prop-types';
import {DateRange} from 'components/Controls';
import ShortCutText from './ShortCutText';
import ShortCutRange from './ShortCutRange';
import './style.less';

export default class ShortCut extends React.Component {
    static props = {
        options: PropTypes.array.isRequired,
    };
    render(){
        const {options} = this.props;
        return (
            <div className="shortcut">
                {
                    options.map((option,i)=>{
                        if(option.type=="text"){
                            return <ShortCutText key={i} data={option}/>
                        }else if(option.type=="dateRange"){
                            return <ShortCutRange key={i} data={option}/>
                        }else{
                            return false;
                        }
                    })
                }
            </div>
        )
    }
}