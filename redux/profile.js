import * as Actions from "./Actions";

export const Profile = (state = { data: {} }, action) => {
  switch (action.type) {
    case Actions.ADD_PROFILE_INFO:
      return { ...state, data: action.payload };
    default:
      return state;
  }
};
