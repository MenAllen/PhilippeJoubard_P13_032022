import { createAsyncThunk } from "@reduxjs/toolkit";

const server = "http://localhost:3001";

export const userLogin = createAsyncThunk(
	"user/userLogin",
	async ({ email, password }, { rejectWithValue }) => {
		return fetch(
			`${server}/api/v1/user/login`,
			{
				method: "POST",
				body: JSON.stringify({ email, password }),
				headers: {
					"Content-Type": "application/json",
          "mode": "cors"
				},
			})
				.then((data) => data.json() )
        .then((mainData) => {
          console.log(mainData)
          if (mainData.status == 200) {
            sessionStorage.setItem('userToken', mainData.body.token)
          }
          return mainData;
        })
				.catch((err) => {
					return rejectWithValue(err.message);
				})
	})


