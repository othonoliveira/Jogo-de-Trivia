import { SAVE_PLAYER } from '../actions';

const INIT_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
};

const player = (state = INIT_STATE, action) => {
  switch (action.type) {
  case SAVE_PLAYER:
    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.gravatarEmail,
    };
  // case GRAVATAR_IMG:
  //   return {
  //     ...state,
  //     gravatarImg: action.payload.gravatarImg,
  //   };
  default:
    return state;
  }
};

export default player;
