import { createSlice } from "@reduxjs/toolkit";
import { userLogin, userSignup } from "./userAction";

const userReducer = createSlice({
  name: "users",
  initialState: {
    user: null,
    loading: false,
  },
  reducers: {
    userLogout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userSignup.pending, (state) => {
        state.loading = true;
      })
      .addCase(userSignup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(userSignup.rejected, (state) => {
        state.loading = false;
        state.user = null;
      })

      //login
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(userLogin.rejected, (state) => {
        state.loading = false;
        state.user = null;
      });
  },
});

export default userReducer.reducer;

export const { userLogout } = userReducer.actions;
