import { createSlice } from "@reduxjs/toolkit";

export const Color_Theme = createSlice({
   name: "Color_theme",
   initialState: {
      Color_theme: false,
   },
   reducers: {
      Color_theme: (state, action) => {
         state.Color_theme = action.payload;
      },
   },
});

export const { Color_theme } = Color_Theme.actions;
export default Color_Theme.reducer;
