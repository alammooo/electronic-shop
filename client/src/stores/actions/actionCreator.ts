import { Action, Dispatch } from "@reduxjs/toolkit"
import axios from "axios"
import { toast } from "react-toastify"
import { notifyError, notifySuccess } from "../../helpers/notify"
import toaster from "../../helpers/toastOptions"
import { uri, User, Data } from "../../interfaces/Interfaces"
import {
  FETCH_ERROR,
  FETCH_ITEM,
  FETCH_ITEMS,
  FETCH_PAGE,
  FETCH_STATUS,
  LOGIN_STATUS,
} from "./actionType"

export function fetchItem(page: number, name?: string) {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const res = await axios.get(
        `${uri}/items?page=${page ? page : 1}&name=${name ? name : ""}`
      )
      dispatch({
        type: FETCH_ITEMS,
        payload: res.data.rows,
      })
      dispatch({
        type: FETCH_PAGE,
        payload: res.data.totalPages,
      })
      dispatch({
        type: FETCH_STATUS,
        payload: "Success fetch item",
      })
    } catch (error: any) {
      toaster(error.response.data.message)
      dispatch({
        type: FETCH_ITEMS,
        payload: [],
      })
    }
  }
}

// export function searchItem(name: string) {
//   return async (dispatch: Dispatch<Action>) => {
//     try {
//       const res = await axios.get(`${uri}/items?name=${name}`)
//       dispatch({
//         type: FETCH_ITEMS,
//         payload: res.data.rows,
//       })
//       dispatch({
//         type: FETCH_STATUS,
//         payload: "Success fetch item",
//       })
//     } catch (error) {
//       dispatch({
//         type: FETCH_ITEMS,
//         payload: [],
//       })
//     }
//   }
// }

export function fetchItemId(id: number) {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const res = await axios.get(`${uri}/items/${id}`)
      dispatch({
        type: FETCH_ITEM,
        payload: res.data,
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export function deleteItem(id: number) {
  return async (dispatch: Dispatch<Action>, getState: any) => {
    try {
      await axios(`${uri}/items/${id}`, {
        method: "DELETE",
        headers: { access_token: localStorage.access_token },
      })
    } catch (error: any) {
      if (error.response.data.message === "Invalid token") {
        toaster("⛔ Please login first")
      }
    }
  }
}

export function createItem(payload: Data) {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const post = await axios.post(`${uri}/items`, payload, {
        headers: {
          access_token: localStorage.access_token,
          "Content-Type": "multipart/form-data",
        },
      })

      if (post.status === 200) toaster("➡️ Succes add item")
    } catch (error: any) {
      if (error.response.data.message === "Invalid token") {
        toaster("⛔ Please login first")
      }
      throw new Error(error.response.data.message)
    }
  }
}

export function updateItem(payload: Data, id: number) {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const update = await axios.put(`${uri}/items/${id}`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
          access_token: localStorage.access_token,
        },
      })
      if (update.status === 200) toaster("✅ Success Update Data")

      const res = await axios.get(`${uri}/items?page=1`)
      dispatch({
        type: FETCH_ITEMS,
        payload: res.data.rows,
      })
    } catch (error: any) {
      if (error.response.data.message === "Invalid token") {
        toaster("⛔ Please login first")
      }
      throw new Error(error.response.data.message)
    }
  }
}

export function loginUser(loginData: User) {
  return (dispatch: Dispatch<Action>) => {
    const { username, password } = loginData
    if (!password || !username) {
      throw { msg: "Username or password cannot be empty" }
    }
    return axios({
      method: "POST",
      url: `${uri}/login`,
      data: { username, password },
    })
      .then((res) => {
        localStorage.setItem("access_token", res.data?.access_token)
        dispatch({
          type: LOGIN_STATUS,
          payload: "✅ Successfully Logged in",
        })
      })
      .catch((error) => {
        dispatch({
          type: LOGIN_STATUS,
          payload: "⛔ Invalid username or Password",
        })
      })
      .finally(() => {
        dispatch({
          type: LOGIN_STATUS,
          payload: "",
        })
      })
  }
}
