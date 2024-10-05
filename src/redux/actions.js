export const showPassword = (state) => {
  return {
    ...state,
    showPassword: !state.showPassword,
  }
}

export const hidePassword = (state) => {
  return {
    ...state,
    showPassword: !state.showPassword,
  }
}
