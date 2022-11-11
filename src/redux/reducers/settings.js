import { SAVE_SETTINGS } from '../actions';

const INITIAL_STATE = {
  category: '',
  difficulty: '',
  type: '',
};

const settings = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_SETTINGS:
    return {
      category: action.payload.category,
      difficulty: action.payload.difficulty,
      type: action.payload.type,
    };
  default:
    return state;
  }
};

export default settings;
