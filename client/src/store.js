import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index'; 

// what is this used for? 
const initialState = {};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = [thunk];

const store = createStore(
        rootReducer, 
        initialState, 
        composeEnhancers(applyMiddleware(...middleware))
);

export default store;