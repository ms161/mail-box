import { createSlice } from "@reduxjs/toolkit";

const token=localStorage.getItem('token')

const authSlice = createSlice({
  name: "authentication",
  initialState: { email: "" ,isLoggedIn:token},
  reducers: {
    email(state, action) {
      state.email = action.payload;
    },
    isLoggedIn(state){
      state.isLoggedIn=true 
      

    },
    logOut(state){
      state.isLoggedIn=false  
      

    }
  },
});
export const authActions=authSlice.actions
export default authSlice.reducer
