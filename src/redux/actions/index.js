import { fetchCategories } from '../../services/Api';

// action type
export const SAVE_PLAYER = 'SAVE_PLAYER';
export const SAVE_POINTS = 'SAVE_POINTS';
export const SAVE_SETTINGS = 'SAVE_SETTINGS';
export const SAVE_CATEGORIES = 'SAVE_CATEGORIES';
export const CLEAR_SCORE = 'CLEAR_SCORE';

// action creator
export const savePlayer = (payload) => ({
  type: SAVE_PLAYER,
  payload,
});

export const savePoints = (payload) => ({
  type: SAVE_POINTS,
  payload,
});

export const saveSettings = (payload) => ({
  type: SAVE_SETTINGS,
  payload,
});

export const saveCategories = (payload) => ({
  type: SAVE_CATEGORIES,
  payload,
});

export const restartScore = () => ({
  type: CLEAR_SCORE,
});

export function getCategories() {
  return async (dispatch) => {
    try {
      const categories = await fetchCategories();
      dispatch(saveCategories(categories));
    } catch (error) {
      console.log(error);
    }
  };
}
