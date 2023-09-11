import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export const isOverSlice = createSlice({
  name: 'isOver',
  initialState: false,
  reducers: {
    setIsOverValue: (state, action: PayloadAction<boolean>) => {
      state = action.payload;
      return state;
    },
  },
})

export const { setIsOverValue } = isOverSlice.actions
export default isOverSlice.reducer