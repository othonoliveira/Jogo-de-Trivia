// action type
export const SAVE_PLAYER = 'SAVE_PLAYER';

export const SAVE_POINTS = 'SAVE_POINTS';

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

export const restartScore = () => ({
  type: CLEAR_SCORE,
});
