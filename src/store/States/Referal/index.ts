import Axios from "axios"
import endPoints from "src/constants/endPoints"
import { ReferalStatus } from "src/constants/interfaces"
import { FetchAllReferalsBody, FetchAllReferalsBodyTag } from "./query"

export const constants = {
  "FETCH_REFERALS": "FETCH_REFERALS"
}

export const stateName = "referals"

export const initialState = {
  referals: []
}

export const reducer = (state: any = initialState, action: any) => {
  switch(action.type) {
    case constants.FETCH_REFERALS: {
      return {
        ...state, referals: action.payload
      }
    }

    default: {
      return state
    }
  }
}

export const selectReferals = (state: any) => state.entities[stateName].referals

export const Actions = {
  fetchReferals: (payload: any[]) => ({ type: constants.FETCH_REFERALS, payload })
}

export const FetchAllReferals = (_: any, callback = (err: any, data: any) => null) => {
  callback(null, [
    { _id: "sdvsdv", token: "sdvsdvsdv", user_from: "sdvsdvsdv", user_to: "sdvsdvsdvsdv", coin_amount: 20, status: ReferalStatus.CLAIMED },
    { _id: "sdvsdv", token: "sdvsdvsddfv ", user_from: "sdvvsdvsdvsdvsdvsdv", user_to: "sdvsdvsdvsdvsdv", coin_amount: 20, status: ReferalStatus.CLAIMED },
    { _id: "sdvsdv", token: "sdvsdv sdvsdvsd", user_from: "sdvsdvsdvsdv", user_to: "sdvssdvsdvsdvdvsdv", coin_amount: 20, status: ReferalStatus.CLAIMED },
  ])
  // Axios.post(endPoints.baseURL, FetchAllReferalsBody())
  // .then(res => {
  //   callback(null, res.data.data[FetchAllReferalsBodyTag])
  // })
  // .catch(err => {
  //   console.log("Error", err)
  //   callback(err, null)
  // })
}