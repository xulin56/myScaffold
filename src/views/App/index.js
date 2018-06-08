import React, { Component } from 'react';
import Home from 'views/Home';
import './style.scss';
import {Switch,Route} from 'react-router-dom';

class App extends Component {
    render() {
        return (
            <div className="App">
                  <Switch>
                     <Route path="/" component={Home} />
                 </Switch>
            </div>
        );
    }
}

export default App;
