import Axios from "axios"
import endPoints from "src/constants/endPoints"
import { FetchCombinationUsersBody, FetchCombinationUsersTag } from "./query"

export const constants = {
  "FETCH_COMBINATION_USERS": "FETCH_COMBINATION_USERS"
}

export const stateName = "combination_users"

export const initialState = {
  brokers: []
}

export const reducer = (state: any = initialState, action: any) => {
  switch(action.type) {
    case constants.FETCH_COMBINATION_USERS: {
      return {
        ...state, brokers: action.payload
      }
    }

    default: {
      return state
    }
  }
}

export const selectCombinationUsers = (state: any) => state.entities[stateName].brokers

export const Actions = {
  fetchCombinationUsers: (payload: any[]) => ({ type: constants.FETCH_COMBINATION_USERS, payload })
}

export const FetchCombinationUsers = (_: any, callback = (err: any, data: any) => null) => {
  Axios.post(endPoints.baseURL, FetchCombinationUsersBody())
  .then(res => {
    callback(null, res.data.data[FetchCombinationUsersTag])
  })
  .catch(err => {
    console.log("Error", err)
    callback(err, null)
  })
}