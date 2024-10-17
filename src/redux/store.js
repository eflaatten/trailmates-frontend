import { configureStore } from "@reduxjs/toolkit";
import reducers from "./reducers"; // Import combined reducers

export default configureStore({
  reducer: reducers,
});
