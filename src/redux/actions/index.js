// action type
export const SAVE_PLAYER = 'SAVE_PLAYER';

// action creator
export const savePlayer = (payload) => ({
  type: SAVE_PLAYER,
  payload,
});
