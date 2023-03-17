import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import { State, uri, User } from "../interfaces/Interfaces"

const initialState: State = {
  data: [],
  isLoading: false,
  error: null,
  status: "",
}

export const userLogin = createAsyncThunk(
  "user/postUser",
  async (payload: User) => {
    try {
      const response = await axios.post(`${uri}/login`, payload)
      if (response.status === 200) {
        localStorage.setItem("access_token", response.data.access_token)
        return "successfully logged in"
      }
    } catch (error) {
      console.log(error)
    }
  }
)

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
})

export default userSlice.reducer
