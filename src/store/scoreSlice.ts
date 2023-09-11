import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export const scoreSlice = createSlice({
  name: 'score',
  initialState: 0,
  reducers: {
    addScoreForLines: (state, action: PayloadAction<number>) => {
      switch(action.payload){
        case 1: {
          state += 10;
          break;
        }
        case 2: {
          state += 25;
          break;
        }
        case 3: {
          state += 40;
          break;
        }
        case 4: {
          state += 60;
          break;
        }
      }
      return state;
    },
  },
})

export const { addScoreForLines } = scoreSlice.actions
export default scoreSlice.reducer