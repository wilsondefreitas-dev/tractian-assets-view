import { configureStore } from "@reduxjs/toolkit";
import assetViewSlice from "./assetViewSlice";

//

const store = configureStore({
  reducer: {
    assetView: assetViewSlice,
  },
});

export default store;

//

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
