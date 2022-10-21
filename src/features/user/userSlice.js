import { createSlice } from "@reduxjs/toolkit";
import { userLogin, userProfile, userName } from "./userActions";

// initialize userToken from session storage
const userToken = sessionStorage.getItem("userToken") ? sessionStorage.getItem("userToken") : null;

const initialState = {
	loading: false,
	userInfo: {},
	userToken: null,
	error: null,
	success: false,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		userLogout: (state) => {
			sessionStorage.removeItem("userToken"); // deletes token from storage
			state.loading = false;
			state.userInfo = null;
			state.userToken = null;
			state.error = null;
			state.success = false;
      state.action = 'none'
		},
	},
	extraReducers: {
		// login user
		[userLogin.pending]: (state) => {
			console.log("login pending");
			state.loading = true;
			state.error = null;
      state.action = "login"
		},
		[userLogin.fulfilled]: (state, { payload }) => {
			console.log("login fulfilled ", payload);
      state.loading = false;
			if (payload.status === 200) {				
				state.userInfo = payload;
				state.userToken = payload.body.token;
				state.success = true;
			} else {
        state.success = false;
        state.error = payload
      }
		},
		[userLogin.rejected]: (state, { payload }) => {
			console.log("login rejected", payload);
			state.loading = false;
      state.success = false;
			state.error = payload;
		},

		// profile user
		[userProfile.pending]: (state) => {
			console.log("profile pending");
			state.loading = true;
			state.error = null;
      state.action = "profile"
		},
		[userProfile.fulfilled]: (state, { payload }) => {
			console.log("profile fulfilled ", payload);
      state.loading = false;
			if (payload.status === 200) {
				state.userInfo = payload.body;
				state.success = true;
			}
		},
		[userProfile.rejected]: (state, { payload }) => {
			console.log("profile rejected", payload);
			state.loading = false;
			state.error = payload;
		},

		// name user
		[userName.pending]: (state) => {
			console.log("name pending");
			state.loading = true;
			state.error = null;
      state.action = "name"
		},
		[userName.fulfilled]: (state, { payload }) => {
			console.log("name fulfilled ", payload);
      state.loading = false;
			if (payload.status === 200) {
				state.userInfo = payload.body;
				state.success = true;
			}
		},
		[userName.rejected]: (state, { payload }) => {
			console.log("name rejected", payload);
			state.loading = false;
			state.error = payload;
		},


  },
});

export const { userLogout } = userSlice.actions;
export default userSlice.reducer;
