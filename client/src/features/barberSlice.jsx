import { createSlice } from "@reduxjs/toolkit";

const barberSlice = createSlice({
  name: "barber",
  initialState: {
    barbers: [],
  },

  reducers: {
    // 🔥 Set barbers (after API call)
    setBarbers: (state, action) => {
      state.barbers = action.payload;
    
    },

    clearBarbers: (state) => {
      state.barbers = [];
    },
  },
});

export const { setBarbers, clearBarbers } = barberSlice.actions;

export default barberSlice.reducer;