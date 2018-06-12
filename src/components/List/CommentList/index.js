import React from 'react';
import {autobind} from 'core-decorators';
import propTypes from 'prop-types';
import './commentlist.less';

@autobind
export default class CommentList extends React.Component {
  static props = {
    listData : propTypes.array.isRequired,
    url : propTypes.string
  }
  state = {
    pageIndex : 1
  }
  loadingMore() {
    const {pageIndex} = this.state;
    this.setState({
      pageIndex : pageIndex+1
    })
    let params = {
      page : pageIndex+1,
      pageSize : 10
    }
    console.log(params,this.props.url)
  }
  render(){
    const {listData,url} = this.props;
    return (
      <div className="comment-list">
          {
            listData.map((item,index)=>{
            return (
              <div key={index} className="list-item">
                  <div className="list-content">
                      <div className="list-img">
                          <img src={item.listImg} alt="" />
                      </div>
                      <div className="list-infor">
                          <h2 className="list-title">{item.listTitle}</h2>
                          <p className="list-description">{item.description}</p>
                      </div>
                  </div>
                  {
                    item.operate
                    ?
                    <div className="list-operate">
                        {
                          item.operate.map((val,inx)=>{
                            return (
                              <span key={inx} onClick={()=>val.render && val.render(item,index)}>{val.label}</span>
                            )
                          })
                        }
                    </div>
                    :
                    ''
                  }

              </div>
            )
          })
        }
          {
            url
            ?
            <div className="loading-more" onClick={this.loadingMore}>加载更多</div>
            :
            ''
          }
      </div>
    )
  }
}
