import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";

/* Creating a store with the reducer. */
export const store = configureStore({
	reducer: {
		user: userReducer,
	},
});
