import { createAsyncThunk } from "@reduxjs/toolkit";

const server = "http://localhost:3001";

export const userLogin = createAsyncThunk(
	"user/userLogin",
	async ({ email, password, checkbox }, { rejectWithValue }) => {
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
				console.log(mainData);
				if (mainData.status === 200) {
					sessionStorage.setItem("userToken", mainData.body.token);
          sessionStorage.setItem("connected", true);
				}
				return mainData;
			})
			.catch((err) => {
				return rejectWithValue(err.message);
			});
	}
);

export const userProfile = createAsyncThunk("user/userProfile", async ({ rejectWithValue }) => {
	console.log("userProfile");
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
			console.log("userProfile mainData: ", mainData);
			return mainData;
		})
		.catch((err) => {
			return rejectWithValue(err.message);
		});
});

export const userName = createAsyncThunk("user/userName", async ({ firstName, lastName }, { rejectWithValue }) => {
	console.log("userName ", firstName, lastName);
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
			console.log(mainData);
			return mainData;
		})
		.catch((err) => {
			return rejectWithValue(err.message);
		});
});
