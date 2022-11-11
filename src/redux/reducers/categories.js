import { SAVE_CATEGORIES } from '../actions';

const INITIAL_STATE = {
  items: [],
};

const categories = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_CATEGORIES:
    return {
      ...state,
      items: action.payload,
    };
  default:
    return state;
  }
};

export default categories;
