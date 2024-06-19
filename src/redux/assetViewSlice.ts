import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ITreeNode } from "src/interfaces/tree";

//

interface IAssetViewState {
  data: null | ITreeNode;
}

const initialState: IAssetViewState = {
  data: null,
};

//

export const assetViewSlice = createSlice({
  name: "assetView",
  initialState,
  reducers: {
    select: (state, action: PayloadAction<ITreeNode>) => {
      state.data = action?.payload;
    },
    unselect: (state) => {
      state.data = null;
    },
  },
});

export const { select, unselect } = assetViewSlice.actions;
export default assetViewSlice.reducer;
