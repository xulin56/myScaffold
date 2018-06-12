import React from 'react';
import ReactDOM from 'react-dom';
import App from 'views/App';
import {Provider} from 'react-redux';
import {store} from 'store';
import createBrowserHistory from 'history/createBrowserHistory';
import {BrowserRouter, Route} from 'react-router-dom';


export const browser=createBrowserHistory();
window.onresize = document.getElementsByTagName('html')[0].style.fontSize = (document.documentElement.clientWidth / 3.75) +'px';
ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Route history={browser} path='/' component={App}/>
        </BrowserRouter>
    </Provider>,
document.getElementById('root'));
