import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from 'views/App';
import {Provider} from 'react-redux';
import {store} from 'store';
import {BrowserRouter, Route} from 'react-router-dom';
console.log(store)
ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Route path='/' component={App}/>
        </BrowserRouter>
    </Provider>,
document.getElementById('root'));