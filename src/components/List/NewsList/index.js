import React from 'react';
import PropTypes from 'prop-types';
import {autobind} from 'core-decorators';
import './newslist.less';

@autobind
export default class NewsList extends React.Component {
  render(){
    return(
      <div className="news-list">
          <div className="list-item">
                <div className="list-content">
                    <h3 className="list-title">千年之狐</h3>
                    <p className="list-description">青丘之民的灵魂不会永远漂泊，因为我在这里</p>
                    <div className="list-digest">青丘，古老的故土。已经忘记了那里的面貌。毁灭的家园只存在于记忆中，族人的灵魂却凝结在随身携带的元魂珠中。
　　时间已过去太久。一千年？两千年？旅途无休无止，看尽了人间沧海桑田，悲欢离合，挥别了擦肩而过的情缘。纵使漫长的时光也无法动摇信念：青丘之灵不会永远漂泊。终有一天，一族的魂灵将渡过轮回的彼岸，再度回到人间，繁衍出新的国度。
　　守护元魂珠，直到那一天……
　　“永恒与刹那间，隔着我和我的剑。”</div>
                    <ul className="operate">
                        <li>
                            <span className="iconfont icon-ICON3"></span>
                            <span>156</span>
                            <span className="line">|</span>
                        </li>
                        <li>
                            <span className="iconfont icon-ICON3"></span>
                            <span>156</span>
                            <span className="line">|</span>
                        </li>
                        <li>
                            <span className="iconfont icon-ICON3"></span>
                            <span>66</span>
                        </li>
                    </ul>
                </div>
                <div className="list-img">
                    <img width='300' src={require('../../images/test2.jpg')} alt="" />
                </div>
          </div>
      </div>
    )
  }
}
