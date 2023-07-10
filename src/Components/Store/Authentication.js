import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authentication",
  initialState: { email: "" },
  reducers: {
    email(state, action) {
      state.email = action.payload;
    },
  },
});
export const authActions=authSlice.actions
export default authSlice.reducer
