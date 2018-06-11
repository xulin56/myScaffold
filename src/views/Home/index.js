import React from 'react';
import {Route} from 'react-router-dom';
import Good from 'views/goods';
import Welcome from 'views/welcome';
import Demo from 'views/Demo';
import './style.scss';

export default class Home extends React.Component{

    render(){
        return(
            <div className="home">
              <Route path='/goods' component={Good} />
              <Route path='/welcome' component={Welcome} />
              <Route path='/demo' component={Demo} />
            </div>
        )
    }
}
