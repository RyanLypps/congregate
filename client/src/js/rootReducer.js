import { combineReducers } from 'redux';
import messengerReducer from './components/Messenger/messengerReducer';
import joinPageReducer from './components/JoinPage/joinReducer';

const rootReducer = combineReducers({
    messenger: messengerReducer,
    joinPage: joinPageReducer,
});
export default rootReducer;