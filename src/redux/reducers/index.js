import { combineReducers } from 'redux';
import categories from './categories';
import player from './player';
import settings from './settings';

const rootReducer = combineReducers({
  player,
  settings,
  categories,
});

export default rootReducer;
