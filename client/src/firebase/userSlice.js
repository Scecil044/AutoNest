import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  users: [],
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
    signOutUser: (state) => {
      state.user = null;
      state.isError = false;
      state.isLoading = false;
    },
    createUserPendingState: (state) => {
      state.isLoading = true;
      state.isError = false;
    },
    createUserFulfilledState: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.users.push(action.payload);
    },
    createUserRejectedState: (state, action) => {
      state.isError = action.payload;
      state.isLoading = false;
    },
    fetchUsersPendingState: (state) => {
      state.isLoading = true;
      state.isError = false;
    },
    fetchUsersFulFilledState: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.users = action.payload;
    },
    fetchUsersRejectedState: (action, state) => {
      state.isError = action.payload;
      state.isLoading = false;
    },
    deleteUserPendingState: (state) => {
      state.isLoading = true;
      state.isError = false;
    },
    deleteUserFulfilledState: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.users.filter((user) => user._id !== action.payload);
    },
    deleteUserRejectedState: (state, action) => {
      state.isError = action.payload;
      state.isLoading = false;
    },
  },
});

export const {
  loginPendingState,
  loginFulfilledState,
  loginRejectedState,
  signOutUser,
  createUserFulfilledState,
  createUserPendingState,
  createUserRejectedState,
  fetchUsersFulFilledState,
  fetchUsersPendingState,
  fetchUsersRejectedState,
  deleteUserFulfilledState,
  deleteUserPendingState,
  deleteUserRejectedState,
} = userSlice.actions;
export default userSlice.reducer;
