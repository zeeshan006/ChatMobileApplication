import { createSlice } from "@reduxjs/toolkit";

export const UserdataSlice = createSlice({
   name: "allUsersdata",
   initialState: {
      allUsersdata: [],
   },
   reducers: {
      alluserdata: (state, action) => {
         state.allUsersdata = action.payload;
         // console.log('redux group', state?.allUsersdata);
      },
   },
});

export const { alluserdata, groupUsers, groupuserCreate } =
   UserdataSlice.actions;
export default UserdataSlice.reducer;
