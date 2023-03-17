import { legacy_createStore as createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { InitialState, User } from "../interfaces/Interfaces"
import {
  FETCH_ERROR,
  FETCH_ITEM,
  FETCH_ITEMS,
  FETCH_PAGE,
  FETCH_STATUS,
  LOGIN_STATUS,
} from "./actions/actionType"

const initialState: InitialState = {
  items: [],
  item: {
    name: "",
    buyPrice: 0,
    sellPrice: 0,
    stock: 0,
    image: "",
  },
  pages: 0,
}

function itemReducer(state = initialState, action: any) {
  switch (action.type) {
    case FETCH_ITEM:
      return {
        ...state,
        item: action.payload,
      }
    case FETCH_ITEMS:
      return {
        ...state,
        items: action.payload,
      }
    case FETCH_PAGE:
      return {
        ...state,
        pages: action.payload,
      }
    case FETCH_ERROR:
      return {
        ...state,
        errors: action.payload,
      }
    case FETCH_STATUS:
      return {
        ...state,
        status: action.payload,
      }
    case LOGIN_STATUS:
      return {
        ...state,
        logins: action.payload,
      }
    default:
      return state
  }
}

const store = createStore(itemReducer, applyMiddleware(thunk))

export default store
