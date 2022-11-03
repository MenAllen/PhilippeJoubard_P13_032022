import { createSlice } from "@reduxjs/toolkit"
import { userLogin, userProfile, userName } from "./userActions"

// initialize userToken from session storage
const userToken = localStorage.getItem("userToken") ? localStorage.getItem("userToken") : null

const initialState = {
	loading: false,
	error: null,
	success: false,
	userToken: userToken,
	firstName: null,
	lastName: null,
	id: null,
	email: null,
	createdAt: null,
	updatedAt: null,
	rememberMe: false,
}

/**
 *  Redux user slice creation, part of Redux store. It includes 
 *    Initial state
 *    Reducers : 
 *      userLogout when disconnecting with signout command or following authentication failure
 *      userClear when previous request has been fully processed
 *      userSetRememberMe / userResetRememberMe to set or reset RememberMe request from user
 *      userSetError to set error message in case of Navigation error
 *    ExtraReducers : (using createSyncThunk)
 *      userLogin.pending, fullfilled and rejected for user login request
 *      userProfile.pending, fullfilled and rejected for user profile request
 *      userName.pending, fullfilled and rejected for user name update request
 */
const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		userLogout: (state) => {
			sessionStorage.removeItem("userToken"); // deletes token from storage
			sessionStorage.removeItem("connected"); // deletes boolean from storage
			localStorage.removeItem("userToken"); // deletes token from storage
			state.loading = false
			state.error = null
			state.success = false
			state.userToken = null
			state.firstName = null
			state.lastName = null
			state.id = null
			state.email = null
			state.createdAt = null
			state.updatedAt = null
		},
		userClear: (state) => {
			state.loading = false
			state.error = null
			state.success = false
		},
		userSetRememberMe: (state) => {
			state.rememberMe = true
		},
		userResetRememberMe: (state) => {
			state.rememberMe = false
		},
		userSetError: (state) => {
			state.error = "Error ! Requested page doesn't exist"
		},
	},
	extraReducers: {
		// login user
		[userLogin.pending]: (state) => {
			console.log("login pending")
			state.loading = true
			state.error = null
			state.success = false
		},
		[userLogin.fulfilled]: (state, { payload }) => {
			console.log("login fulfilled ", payload)
			state.loading = false
			if (payload.status === 200) {
				sessionStorage.setItem("userToken", payload.body.token)
				sessionStorage.setItem("connected", true)
				if (state.rememberMe) {
					localStorage.setItem("userToken", payload.body.token)
				}
				state.userToken = payload.body.token
				state.success = true
			} else {
				state.success = false
				state.error = payload
			}
		},
		[userLogin.rejected]: (state, { payload }) => {
			console.log("login rejected", payload)
			state.loading = false
			state.success = false
			state.error = payload
		},

		// profile user
		[userProfile.pending]: (state) => {
			console.log("profile pending")
			state.loading = true
			state.error = null
			state.success = false
		},
		[userProfile.fulfilled]: (state, { payload }) => {
			console.log("profile fulfilled ", payload)
			state.loading = false
			if (payload.status === 200) {
				state.success = true
        sessionStorage.setItem("connected", true)
				state.email = payload.body.email
				state.firstName = payload.body.firstName
				state.lastName = payload.body.lastName
				state.id = payload.body.id
				state.createdAt = payload.body.createdAt
				state.updatedAt = payload.body.updatedAt
			} else {
				state.success = false
				state.error = payload
			}
		},
		[userProfile.rejected]: (state, { payload }) => {
			console.log(`profile rejected`, payload)
			state.loading = false
			state.error = payload
		},

		// name user
		[userName.pending]: (state) => {
			console.log("name pending")
			state.loading = true
			state.error = null
			state.success = false
		},
		[userName.fulfilled]: (state, { payload }) => {
			console.log("name fulfilled ", payload)
			state.loading = false
			if (payload.status === 200) {
				state.success = true
				state.email = payload.body.email
				state.firstName = payload.body.firstName
				state.lastName = payload.body.lastName
				state.id = payload.body.id
				state.createdAt = payload.body.createdAt
				state.updatedAt = payload.body.updatedAt
			} else {
				state.success = false
				state.error = payload
			}
		},
		[userName.rejected]: (state, { payload }) => {
			console.log("name rejected", payload)
			state.loading = false
			state.error = payload
		},
	},
})

export const { userLogout, userClear, userSetRememberMe, userResetRememberMe, userSetError } = userSlice.actions
export default userSlice.reducer
