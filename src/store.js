import { configureStore } from "@reduxjs/toolkit";
// import AuthStore from './redux/Theme/AuthStore'
import AuthStore from "./store/AuthStore";

export default configureStore({
  reducer: {
    AuthStore: AuthStore,
  },
});
