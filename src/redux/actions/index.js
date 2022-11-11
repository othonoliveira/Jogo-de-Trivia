// action type
export const SAVE_PLAYER = 'SAVE_PLAYER';

export const SAVE_POINTS = 'SAVE_POINTS';

// action creator
export const savePlayer = (payload) => ({
  type: SAVE_PLAYER,
  payload,
});

export const savePoints = (payload) => ({
  type: SAVE_POINTS,
  payload,
});
