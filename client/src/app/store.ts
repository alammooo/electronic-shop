import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import dataReducer, { fetchData } from "../features/dataSlice"
import userReducer from "../features/userSlice"

export const store = configureStore({
  reducer: {
    data: dataReducer,
    user: userReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
