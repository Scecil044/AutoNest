import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoading: false,
  isError: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginPendingState: (state) => {
      state.isLoading = true;
    },
    loginFulfilledState: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.user = action.payload;
    },
    loginRejectedState: (state, action) => {
      state.isError = action.payload;
      state.isLoading = false;
    },
  },
});

export const { loginPendingState, loginFulfilledState, loginRejectedState } =
  userSlice.actions;
export default userSlice.reducer;
