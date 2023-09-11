import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export const scoreSlice = createSlice({
  name: 'score',
  initialState: 0,
  reducers: {
    addScore: (state, action: PayloadAction<number>) => {
      state += action.payload;
      return state;
    },
  },
})

export const { addScore } = scoreSlice.actions
export default scoreSlice.reducer