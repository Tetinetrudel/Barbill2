import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  user: null,
  token: null,
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.accessToken
    },
    setLogout: (state) => {
      state.user = null
      state.token = null
    },
    setUpdateUser: (state, action) => {
      state.user = action.payload.updatedUser
    },
  },
})

export const { setLogin, setLogout, setUpdateUser } = authSlice.actions
export default authSlice.reducer