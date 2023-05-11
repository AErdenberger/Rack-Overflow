import { combineReducers } from 'redux';
import { sessionErrorsReducer } from './session';
import { postErrorsReducer } from './posts';
import { commentErrorReducer } from './comments';

export default combineReducers({
  session: sessionErrorsReducer,
  posts: postErrorsReducer,
  comment: commentErrorReducer 
});