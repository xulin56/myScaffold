import React from 'react';
import ReactDOM from 'react-dom';
import App from 'views/App';
import {Provider} from 'react-redux';
import {store} from 'store';
import {BrowserRouter, Route} from 'react-router-dom';
import 'style/index.css';

window.onresize = document.getElementsByTagName('html')[0].style.fontSize = (document.documentElement.clientWidth / 3.75) +'px';
ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Route path='/' component={App}/>
        </BrowserRouter>
    </Provider>,
document.getElementById('root'));
