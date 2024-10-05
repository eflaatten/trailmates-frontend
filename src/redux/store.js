import { configureStore } from '@reduxjs/toolkit';
import reducers from './reducers';
import state from './state';

export default configureStore({
  reducer: reducers,
  preloadedState: state,
})