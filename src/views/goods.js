import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from 'store/action/goods';
class Goods extends Component {
    state = {
        data : [{
      			name: 'iPhone 7',
      			price: '6,888',
      			amount: 37
      		}, {
      			name: 'iPad',
      			price: '3,488',
      			amount: 82
      		}, {
      			name: 'MacBook Pro',
      			price: '11,888',
      			amount: 15
      		}]
    }
    componentDidMount() {
        const {data} = this.state;
        const {dispatch} = this.props;
        dispatch(actions.getGoods(data));
    }
    render() {
        return this.props.isFetching ? (<h1>Loading…</h1>) : (
            <ul className="goods">
                {
                    this.props.data.map((ele, idx) => (
                        <li key={idx}>
                            <span>{ele.name}</span> |
                            <span>￥ {ele.price}</span> |
                            <span>剩余 {ele.amount} 件</span>
                        </li>
                    ))
                }
            </ul>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
            isFetching: state.good.isFetching,
            data: state.good.goods
        }
};

export default connect(mapStateToProps)(Goods);
