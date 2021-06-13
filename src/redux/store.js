// custom reducer imports
import authReducer from './Auth/authReducer';
import projectReducer from './Project/projectreducer';
import loadingReducer from './Loading/loadingReducer';

// redux package imports
import { combineReducers } from 'redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// root reducer declaration
const rootReducer = combineReducers({
  auth: authReducer,
  project: projectReducer,
  loading: loadingReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
