import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  vehicles: [],
  isLoading: false,
  isError: false,
};

const vehiclesSlice = createSlice({
  name: "vehicles",
  initialState,
  reducers: {
    fetchVehiclesPendingState: (state) => {
      state.isLoading = false;
      state.isError = false;
    },
    fetchVehiclesRejectedState: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    },
    fetchVehiclesFulfilledState: (state, action) => {
      state.vehicles = action.payload;
      state.isLoading = false;
      state.isError = false;
    },
    deleteVehicleFulfilledState: (state, action) => {
      state.vehicles.filter((vehicle) => vehicle._id !== action.payload);
    },
  },
});

export const {
  fetchVehiclesFulfilledState,
  fetchVehiclesPendingState,
  fetchVehiclesRejectedState,
  showMoreVehicles,
  deleteVehicleFulfilledState,
} = vehiclesSlice.actions;

export default vehiclesSlice.reducer;
