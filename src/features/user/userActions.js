import { createAsyncThunk } from "@reduxjs/toolkit"

const server = "http://localhost:3001"

/**
 *  Redux userlogin action : fetch request returning a promise.
 *  The userLogin action (POST) requires parameters email and password, and returns user token if successfull
 */
export const userLogin = createAsyncThunk(
	"user/userLogin",
	async ({ email, password }, { rejectWithValue }) => {
    console.log("userLogin");
		return fetch(`${server}/api/v1/user/login`, {
			method: "POST",
			body: JSON.stringify({ email, password }),
			headers: {
				"Content-Type": "application/json",
				mode: "cors",
			},
		})
			.then((data) => data.json())
			.then((mainData) => {
				console.log(mainData)
				return mainData
			})
			.catch((err) => {
				return rejectWithValue(err.message)
			})
	}
)

/**
 *  Redux userProfile action : fetch request returning a promise.
 *  The userProfile action (POST) returns email, firstName, lastName, user id, createdDate & updatedDate if successfull
 */
export const userProfile = createAsyncThunk("user/userProfile", async ( { data }, { rejectWithValue }) => {
	console.log("userProfile")
	return fetch(`${server}/api/v1/user/profile`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
			"Content-Type": "application/json",
			mode: "cors",
		},
	})
		.then((data) => data.json())
		.then((mainData) => {
			console.log("userProfile mainData: ", mainData)
			return mainData
		})
		.catch((err) => {
			return rejectWithValue(err.message)
		});
});

/**
 *  Redux userName action : fetch request returning a promise.
 *  The userName action (PUT) requires firstName & lastName parameters, and returns email, firstName, lastName, user id, createdDate & updatedDate if successfull
 */
export const userName = createAsyncThunk("user/userName", async ({ firstName, lastName }, { rejectWithValue }) => {
	console.log("userName ", firstName, lastName)
	return fetch(`${server}/api/v1/user/profile`, {
		method: "PUT",
    body: JSON.stringify({ firstName, lastName }),
		headers: {
			Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
			"Content-Type": "application/json",
			mode: "cors",
		},
	})
		.then((data) => data.json())
		.then((mainData) => {
			console.log(mainData)
			return mainData
		})
		.catch((err) => {
			return rejectWithValue(err.message)
		});
});
