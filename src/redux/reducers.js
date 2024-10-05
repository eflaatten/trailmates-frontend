import { combineReducers } from "redux";

export const showPassword = (state = [], action) => {
  switch(action.type) {
    case 'SHOW_PASSWORD':
      return {
        ...state,
        showPassword: !state.showPassword,
      }
    case 'HIDE_PASSWORD':
      return {
        ...state,
        showPassword: !state.showPassword,
      }
    default:
      return state;
  }
}

export default combineReducers({ showPassword })