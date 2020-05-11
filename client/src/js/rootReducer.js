import { combineReducers } from 'redux';
import appReducer from './components/MainPage/mainReducer';

const rootReducer = combineReducers({
    app: appReducer,
});
export default rootReducer;