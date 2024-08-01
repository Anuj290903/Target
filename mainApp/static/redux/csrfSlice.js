import { createSlice } from '@reduxjs/toolkit';

const csrfSlice = createSlice({
  name: 'csrf',
  initialState: {
    token: null,
  },
  reducers: {
    setCsrfToken(state, action) {
      state.token = action.payload;
    },
  },
});

export const { setCsrfToken } = csrfSlice.actions;
export default csrfSlice.reducer;