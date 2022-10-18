import { createSlice } from "@reduxjs/toolkit"
import { userLogin } from './userActions'

// initialize userToken from session storage
const userToken = sessionStorage.getItem('userToken')
  ? sessionStorage.getItem('userToken')
  : null

const initialState = {
  loading: false,
  userInfo: {},
  userToken: null,
  error: null,
  success: false
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    // login user
    [userLogin.pending]: (state) => {
console.log("pending")
      state.loading = true
      state.error = null
    },
    [userLogin.fulfilled]: (state, { payload }) => {
console.log("fulfilled ", payload)
      if (payload.status === 200) {
      state.loading = false
      state.userInfo = payload
      state.userToken = payload.body.token

      }
    },
    [userLogin.rejected]: (state, { payload }) => {
console.log("rejected", payload)
      state.loading = false
      state.error = payload
    },
  }
})

export default userSlice.reducer