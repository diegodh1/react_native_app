import { createStore, combineReducers,applyMiddleware } from 'redux';
import userRedux from './reducers/userRedux';
import middleware from './middleware';

const reducer = combineReducers({
    userRedux,
});
const store = createStore(reducer,undefined,applyMiddleware(middleware));
export default store;