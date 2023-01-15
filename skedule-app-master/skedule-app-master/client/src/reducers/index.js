import { combineReducers } from 'redux';
import authReducer from './authReducer'; 
import errorReducer from './errorReducer'; 
import profileReducer from './profileReducer'; 
import orderReducer from './orderReducer'; 


export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  order: orderReducer
});