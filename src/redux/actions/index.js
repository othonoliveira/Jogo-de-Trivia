// action type
export const SAVE_PLAYER = 'SAVE_PLAYER';
// export const GRAVATAR_IMG = 'GRAVATAR_IMG';

// action creator
export const savePlayer = (payload) => ({
  type: SAVE_PLAYER,
  payload,
});

// export const gravatarImg = (payload) => ({
//   type: GRAVATAR_IMG,
//   payload,
// });

// const getGravatarAPI = async (hash) => {
//   const endPoint = await fetch(`https://www.gravatar.com/avatar/${hash}`);
//   const request = await fetch(endPoint);
//   const response = await request.json();
//   return response;
// };

// // thunk
// export const getImgGravatar = () => async (dispatch) => {
//   try {
//     const response = await getGravatarAPI(hash);
//     dispatch(gravatarImg(response));
//   } catch (error) {
//     console.log(error);
//   }
// };
// export default getImgGravatar;
