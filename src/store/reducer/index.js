import {combineReducers} from 'redux';
import {good} from './goods';
import {isLoading} from './loading';

export const rootReducer = combineReducers({
    good,
    isLoading,
});
