import { configureStore } from "@reduxjs/toolkit";
import authReducer from './Authentication'
const store=configureStore({
    reducer:{auth:authReducer}
})

export default store 


