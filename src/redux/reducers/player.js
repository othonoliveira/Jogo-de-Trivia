import {
  CLEAN_PLAYER,
  CLEAR_SCORE,
  GAME_OVER,
  SAVE_PLAYER,
  SAVE_POINTS,
  START_GAME,
} from '../actions';

const INIT_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  game: true,
};

const player = (state = INIT_STATE, action) => {
  switch (action.type) {
  case SAVE_PLAYER:
    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.email,
    };

  case SAVE_POINTS:
    return {
      ...state,
      score: action.payload.score,
      assertions: action.payload.assertions,
    };
  case CLEAR_SCORE:
    return {
      ...state,
      assertions: 0,
      score: 0,
    };
  case GAME_OVER:
    return {
      ...state,
      game: true,
    };
  case START_GAME:
    return {
      ...state,
      game: false,
    };
  case CLEAN_PLAYER:
    return {
      ...state,
      name: '',
      gravatarEmail: '',
      assertions: 0,
      score: 0,
    };
  default:
    return state;
  }
};

export default player;
