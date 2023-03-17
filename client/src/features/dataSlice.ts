import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import { State, uri } from "../interfaces/Interfaces"

const initialState: State = {
  data: [],
  isLoading: false,
  error: null,
  status: "",
}

export const fetchData = createAsyncThunk(
  "data/fetchData",
  async (page: number | null) => {
    try {
      const response = await axios.get(`${uri}/items?page=${page}`)
      return response.data
    } catch (error) {
      console.log(error)
    }
  }
)

export const fetchDataById = createAsyncThunk(
  "data/fetchDataById",
  async (id: number) => {
    try {
      const response = await axios.get(`${uri}/items/${id}`)

      return response.data
    } catch (error) {
      console.log(error)
    }
  }
)

export const createData = createAsyncThunk(
  "data/createData",
  async (payload: any) => {
    try {
      const response = await axios.post(`${uri}/items`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    } catch (error: any) {
      console.log(error)
    }
  }
)

export const deleteData = createAsyncThunk(
  "data/deleteData",
  async (id: number) => {
    try {
      const response = await axios.delete(`${uri}/items/${id}`)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }
)

export const updateData = createAsyncThunk(
  "data/updateData",
  async (id: number, payload: any) => {
    try {
      const response = await axios.put(`${uri}/items/${id}`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }
)

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.isLoading = true
      state.error = null
    })
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.isLoading = false
      state.data = action.payload
    })
    builder.addCase(fetchData.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
    builder.addCase(fetchDataById.pending, (state) => {
      state.isLoading = true
      state.error = null
    })
    builder.addCase(fetchDataById.fulfilled, (state, action) => {
      state.isLoading = false
      state.data = action.payload
    })
    builder.addCase(fetchDataById.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
    builder.addCase(deleteData.pending, (state) => {
      state.isLoading = true
      state.error = null
    })
    builder.addCase(deleteData.fulfilled, (state, action) => {
      state.isLoading = false
      state.status = action.payload
    })
    builder.addCase(deleteData.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
    builder.addCase(updateData.pending, (state) => {
      state.isLoading = true
      state.error = null
    })
    builder.addCase(updateData.fulfilled, (state, action) => {
      state.isLoading = false
    })
    builder.addCase(updateData.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
  },
})

export default dataSlice.reducer
