import { fetchCategories } from '../../services/Api';

// action type
export const SAVE_PLAYER = 'SAVE_PLAYER';
export const SAVE_POINTS = 'SAVE_POINTS';
export const SAVE_SETTINGS = 'SAVE_SETTINGS';
export const SAVE_CATEGORIES = 'SAVE_CATEGORIES';
export const CLEAR_SCORE = 'CLEAR_SCORE';
export const GAME_OVER = 'GAME_OVER';
export const START_GAME = 'START_GAME';
export const CLEAN_PLAYER = 'CLEAN_PLAYER';

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

export const gameOver = () => ({
  type: GAME_OVER,
});

export const startGame = () => ({
  type: START_GAME,
});

export const cleanPlayer = () => ({
  type: CLEAN_PLAYER,
});
