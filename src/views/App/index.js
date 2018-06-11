import React, { Component } from 'react';
import Home from 'views/Home';
import {Switch,Route} from 'react-router-dom';
import {connect} from 'react-redux';
import Loading from 'components/Loading';
import * as actions from 'store/action/loading';
import './style.css';

class App extends Component {
    componentDidMount() {
      const {dispatch} = this.props;
      dispatch(actions.getLoading(true));
    }
    render() {
       const {isLoading}=this.props;
        return (
            <div className="app">
                  <Switch>
                     <Route path="/" component={Home} />
                 </Switch>
                 <Loading show={isLoading} />
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    const {isLoading} = state.isLoading;
    return {
            isLoading
        }
};
export default connect(mapStateToProps)(App);
